import * as React from "react"

/**
 * A higher-order component (HOC) to properly wrap Radix UI components
 * Ensures className prop works properly and displayName is set
 */
export function withRadix<T, P extends { className?: string }>(
  Component: React.ForwardRefExoticComponent<P & React.RefAttributes<T>>,
  displayName: string
) {
  // Create the wrapped component
  const WrappedComponent = React.forwardRef<T, P>((props, ref) => {
    return <Component {...props} ref={ref} />;
  });
  
  // Set the display name
  WrappedComponent.displayName = displayName;
  
  return WrappedComponent;
}

/**
 * Type to represent component props with className
 */
export type WithClassName<P> = P & { className?: string }; 