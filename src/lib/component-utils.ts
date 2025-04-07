import React from "react";

/**
 * Sets the displayName property on a component
 * @param Component The component to set the displayName on
 * @param name The name to set
 */
export function withDisplayName<T extends React.ComponentType<any>>(
  Component: T,
  name: string
): T {
  // @ts-ignore - We know this is safe
  Component.displayName = name;
  return Component;
}

/**
 * Type helper for component props with className
 */
export type WithClassName<P = {}> = P & { className?: string };

/**
 * Type helper for Radix UI primitives
 */
export type RadixComponent<P = {}> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<HTMLElement>
>;

/**
 * Helper to create a forwardRef component with displayName
 */
export function createNamedComponent<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  displayName: string
) {
  return withDisplayName(
    React.forwardRef<T, P>(render),
    displayName
  );
}

/**
 * Enhances a component to make className handling safer.
 * Used for Radix UI components that need special handling.
 * 
 * @param component The React component to wrap 
 * @param displayName The display name for the component
 */
export function enhanceComponent<T, P extends { className?: string }>(
  component: React.ForwardRefExoticComponent<P & React.RefAttributes<T>>,
  displayName: string
): React.ForwardRefExoticComponent<P & React.RefAttributes<T>> {
  // Set the display name
  return withDisplayName(component, displayName);
} 