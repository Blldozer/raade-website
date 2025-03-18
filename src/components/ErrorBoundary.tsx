
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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
 * 
 * @param children - The components to be wrapped by the error boundary
 * @param fallback - Optional custom fallback UI to show when an error occurs
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
    // Log error information for debugging
    console.error("ErrorBoundary caught an error:", error);
    console.error("Component stack:", errorInfo.componentStack);
    
    // Update state with error info
    this.setState({
      errorInfo
    });
    
    // You could also send error reports to a service here
  }
  
  componentDidMount(): void {
    console.log("ErrorBoundary mounted");
  }
  
  componentWillUnmount(): void {
    console.log("ErrorBoundary unmounting");
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI or default error message
      return this.props.fallback || (
        <div className="p-8 text-center bg-white border border-red-200 rounded-md shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Something went wrong</h2>
          <p className="text-gray-700 mb-4">The application encountered an error. Please try refreshing the page.</p>
          <p className="text-sm text-gray-500 mb-2">{this.state.error?.message}</p>
          <pre className="text-xs text-left bg-gray-50 p-2 rounded overflow-auto max-h-32">
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }

    // If no error occurred, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
