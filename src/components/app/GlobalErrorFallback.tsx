
import { Button } from "@/components/ui/card";

/**
 * Global error fallback component
 * Displays when an unhandled error occurs in the application
 */
const GlobalErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-white p-6">
    <div className="max-w-md text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="mb-4">We're sorry, but we couldn't load the page.</p>
      <p className="text-sm text-gray-600 mb-4">{error.message}</p>
      <Button 
        onClick={() => window.location.reload()}
        className="bg-raade-navy text-white px-4 py-2 rounded"
      >
        Refresh Page
      </Button>
    </div>
  </div>
);

export default GlobalErrorFallback;
