
// Set up CORS headers for the Edge Function
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow requests from any origin during development
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

/**
 * Create success response with payload
 * 
 * @param data - Response data
 * @param additionalHeaders - Optional additional headers to include
 * @returns Response object
 */
export const createResponse = (data: any, additionalHeaders = {}) => {
  return new Response(
    JSON.stringify(data),
    {
      headers: {
        ...corsHeaders,
        ...additionalHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    }
  );
};

/**
 * Create error response with consistent format
 * 
 * @param error - Error message for developers
 * @param details - User-friendly error message
 * @param status - HTTP status code
 * @param requestId - Request ID for tracking
 * @returns Response object
 */
export const createErrorResponse = (error: string, details?: string, status: number = 400, requestId?: string) => {
  // Log error for debugging
  console.error(`Payment processing error: ${error}`, { status, requestId, details });
  
  // Create standardized error response
  return new Response(
    JSON.stringify({
      error,
      details: details || error,
      success: false,
      requestId,
      timestamp: new Date().toISOString()
    }),
    {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        // Add rate limiting headers when appropriate
        ...(status === 429 ? {
          'Retry-After': '60',  // Suggest client retry after 1 minute
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0'
        } : {})
      },
      status,
    }
  );
};

/**
 * Create rate limit error response
 * 
 * @param retrySeconds - Seconds until client should retry
 * @param requestId - Request ID for tracking
 * @returns Response object with rate limiting headers
 */
export const createRateLimitResponse = (retrySeconds = 60, requestId?: string) => {
  return createErrorResponse(
    "Rate limit exceeded", 
    "Payment service is experiencing high volume. Please try again later.", 
    429, 
    requestId
  );
};

/**
 * Create a timeout promise that rejects after specified time
 * with proper cleanup capabilities
 * 
 * @param ms - Timeout in milliseconds
 * @param message - Error message
 * @returns Object with promise and cleanup function
 */
export const createTimeout = (ms: number, message: string): { 
  promise: Promise<never>; 
  cleanup: () => void;
} => {
  let timeoutId: number | undefined;
  
  const promise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });
  
  const cleanup = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };
  
  return { promise, cleanup };
};

/**
 * Helper to implement exponential backoff for retries
 * 
 * @param attempt - Current attempt number (0-based)
 * @param baseDelay - Base delay in ms
 * @param maxDelay - Maximum delay in ms
 * @returns Delay in milliseconds
 */
export const getBackoffDelay = (attempt: number, baseDelay = 500, maxDelay = 10000): number => {
  const delay = Math.min(
    maxDelay,
    baseDelay * Math.pow(2, attempt) + Math.random() * 500
  );
  return delay;
};
