
// Set up CORS headers for the Edge Function
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Create success response with payload
 * 
 * @param data - Response data
 * @returns Response object
 */
export const createResponse = (data: any) => {
  return new Response(
    JSON.stringify(data),
    {
      headers: {
        ...corsHeaders,
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
  return new Response(
    JSON.stringify({
      error,
      details: details || error,
      success: false,
      requestId
    }),
    {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status,
    }
  );
};

/**
 * Create a timeout promise that rejects after specified time
 * 
 * @param ms - Timeout in milliseconds
 * @param message - Error message
 * @returns Promise that rejects after timeout
 */
export const createTimeout = (ms: number, message: string): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), ms);
  });
};
