
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  suppressDevErrors?: boolean; // New prop to suppress specific dev errors
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 * 
 * A class component that catches JavaScript errors anywhere in its child component tree,
 * displays a fallback UI, and logs error information for debugging.
 * Enhanced with improved error reporting, recovery options, and development error filtering.
 * 
 * @param children - The components to be wrapped by the error boundary
 * @param fallback - Optional custom fallback UI to show when an error occurs
 * @param suppressDevErrors - Optional flag to suppress development-only errors
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
    
    console.log("ErrorBoundary initialized");
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    console.error("ErrorBoundary caught error:", error.message);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Check if this is a dev-only error we should suppress
    if (this.props.suppressDevErrors && this.isDevOnlyError(error)) {
      // Reset error state - don't show fallback UI for dev-only errors
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null
      });
      
      // Still log it but with reduced severity
      console.log("Development-only error suppressed:", error.message);
      return;
    }
    
    // Log error information for debugging
    console.error("ErrorBoundary caught an error:", error);
    console.error("Component stack:", errorInfo.componentStack);
    
    // Update state with error info
    this.setState({
      errorInfo
    });
    
    // You could also send error reports to a service here
  }
  
  // Helper method to identify development-only errors
  isDevOnlyError(error: Error): boolean {
    const errorMessage = error.message || '';
    
    // Common development-mode errors to suppress
    const devOnlyErrorPatterns = [
      // React StrictMode double-rendering related errors
      'NotifiedDOMFulfilment', 
      'NotifiedDOMAttempt',
      'Minified React error',
      'Cannot update a component'
    ];
    
    // Check if the error message contains any of the dev-only patterns
    return devOnlyErrorPatterns.some(pattern => errorMessage.includes(pattern));
  }
  
  componentDidMount(): void {
    console.log("ErrorBoundary mounted");
  }
  
  componentWillUnmount(): void {
    console.log("ErrorBoundary unmounting");
  }
  
  handleReload = (): void => {
    // Reset the error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Force a refresh of the component
    window.location.reload();
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI or default error message with reload button
      return this.props.fallback || (
        <div className="p-8 text-center bg-white border border-red-200 rounded-md shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Something went wrong</h2>
          <p className="text-gray-700 mb-4">The application encountered an error. Please try refreshing the page.</p>
          <p className="text-sm text-gray-500 mb-2">{this.state.error?.message}</p>
          <pre className="text-xs text-left bg-gray-50 p-2 mb-4 rounded overflow-auto max-h-32">
            {this.state.errorInfo?.componentStack}
          </pre>
          <button 
            onClick={this.handleReload}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    // If no error occurred, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
