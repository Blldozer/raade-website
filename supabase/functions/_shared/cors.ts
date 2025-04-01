
/**
 * Cross-Origin Resource Sharing (CORS) headers
 * 
 * These headers allow the API to be called from web browsers
 * This is essential for the frontend application to interact with edge functions
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
};
