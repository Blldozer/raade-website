
// CORS headers for cross-origin requests
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate standard response with CORS headers
export function createResponse(data: any, status: number = 200) {
  return new Response(
    JSON.stringify(data),
    { 
      status, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    }
  );
}

// Generate error response with consistent format
export function createErrorResponse(error: string, details?: string, status: number = 400, requestId?: string) {
  const responseBody: any = { 
    error,
    requestId
  };
  
  if (details) {
    responseBody.details = details;
  }
  
  return createResponse(responseBody, status);
}

// Timeout promise helper
export function createTimeout(ms: number, message: string) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });
}
