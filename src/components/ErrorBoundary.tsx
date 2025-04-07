import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  suppressDevErrors?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 * 
 * A class component that catches JavaScript errors anywhere in its child component tree,
 * displays a fallback UI, and logs error information for debugging.
 * Enhanced with improved error reporting, recovery options, and development error filtering.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    console.log("ErrorBoundary initialized");
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.error("ErrorBoundary caught error:", error.message);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (this.props.suppressDevErrors && this.isDevOnlyError(error)) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null
      });
      console.log("Development-only error suppressed:", error.message);
      return;
    }
    
    console.error("ErrorBoundary caught an error:", error);
    console.error("Component stack:", errorInfo.componentStack);
    
    this.setState({ errorInfo });
  }
  
  isDevOnlyError(error: Error): boolean {
    const errorMessage = error.message || '';
    const devOnlyErrorPatterns = [
      'NotifiedDOMFulfilment', 
      'NotifiedDOMAttempt',
      'Minified React error',
      'Cannot update a component'
    ];
    return devOnlyErrorPatterns.some(pattern => errorMessage.includes(pattern));
  }
  
  componentDidMount(): void {
    console.log("ErrorBoundary mounted");
  }
  
  componentWillUnmount(): void {
    console.log("ErrorBoundary unmounting");
  }
  
  handleReload = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.reload();
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Create error UI using React.createElement instead of JSX
      return React.createElement(
        'div',
        { className: 'p-8 text-center bg-white border border-red-200 rounded-md shadow-sm' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-red-600' }, 'Something went wrong'),
        React.createElement('p', { className: 'text-gray-700 mb-4' }, 'The application encountered an error. Please try refreshing the page.'),
        React.createElement('p', { className: 'text-sm text-gray-500 mb-2' }, this.state.error?.message),
        React.createElement('pre', { className: 'text-xs text-left bg-gray-50 p-2 mb-4 rounded overflow-auto max-h-32' }, 
          this.state.errorInfo?.componentStack
        ),
        React.createElement(
          'button',
          { 
            onClick: this.handleReload,
            className: 'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
          },
          'Reload Page'
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
