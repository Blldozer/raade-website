import * as React from "react"

type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never

/**
 * A higher-order component (HOC) to properly wrap Radix UI components
 * Ensures className prop works properly and displayName is set
 */
export function withRadix<T extends React.ComponentType<any>>(
  Component: T,
  displayName?: string
): React.ForwardRefExoticComponent<ComponentProps<T> & React.RefAttributes<any>> & {
  displayName?: string
} {
  const WrappedComponent = React.forwardRef<any, ComponentProps<T>>((props, ref) => {
    return React.createElement(Component, { ...props, ref })
  })

  if (displayName) {
    Object.defineProperty(WrappedComponent, "displayName", {
      value: displayName,
      configurable: true,
    })
  }

  Object.defineProperty(WrappedComponent, "$$typeof", {
    value: Symbol.for("react.forward_ref"),
    configurable: true,
  })

  return WrappedComponent as React.ForwardRefExoticComponent<
    ComponentProps<T> & React.RefAttributes<any>
  > & {
    displayName?: string
  }
}

/**
 * Type to represent component props with className
 */
export type WithClassName<P> = P & { className?: string };

/**
 * Type to represent a component with displayName
 */
export type ComponentWithDisplayName<T, P> = React.ForwardRefExoticComponent<P & React.RefAttributes<T>> & {
  displayName: string;
}; 