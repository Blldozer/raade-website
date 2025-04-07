import * as React from "react";

/**
 * This file provides patching utilities for Radix UI components to
 * enhance type compatibility with our codebase
 */

/**
 * A type that adds className property to an existing type
 */
export type WithClassName<T = {}> = T & { className?: string };

/**
 * A type that adds children property to an existing type
 */
export type WithChildren<T = {}> = T & { children?: React.ReactNode };

/**
 * Applies displayName to a component
 */
export function withDisplayName<T extends React.ElementType>(
  Component: T,
  name: string
): T {
  // @ts-ignore - We know this is safe
  Component.displayName = name;
  return Component;
}

/**
 * Higher-order component that patches a Radix primitive component
 * to support className and children props even when the original
 * component doesn't explicitly declare them in its types
 */
export function patchRadixComponent<
  T extends React.ElementType
>(
  Component: T,
  displayName: string
): T {
  const Patched = React.forwardRef((props: any, ref: any) => {
    return <Component ref={ref} {...props} />;
  });

  return withDisplayName(Patched as any, displayName);
}

/**
 * This function is used to patch an entire Radix UI primitive module
 * by creating wrapped versions of all its components that support 
 * className and children props
 */
export function patchRadixModule<T extends Record<string, any>>(
  primitiveModule: T,
  prefix: string
): T {
  const result: Record<string, any> = {};

  // Loop through all components in the module
  for (const key in primitiveModule) {
    const component = primitiveModule[key];
    
    // Skip non-components
    if (typeof component !== 'function' && typeof component !== 'object') {
      result[key] = component;
      continue;
    }

    // Handle component objects (they usually have a render method)
    if (typeof component === 'object' && component.$$typeof) {
      result[key] = patchRadixComponent(
        component,
        component.displayName || `${prefix}${key}`
      );
    } else {
      // Just pass through non-component values
      result[key] = component;
    }
  }

  return result as T;
} 