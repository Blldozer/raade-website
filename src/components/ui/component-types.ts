import * as React from "react"

/**
 * Common types for Radix UI components
 */

// Make component type that preserves displayName
export type ExtendedForwardRef<
  T,
  P extends object = {}
> = React.ForwardRefExoticComponent<P & React.RefAttributes<T>> & {
  displayName?: string
}

// Type for creating properly typed Radix component with displayName
export function createTypedComponent<T, P extends object = {}>(
  component: React.ForwardRefExoticComponent<P & React.RefAttributes<T>>,
  displayName?: string
): ExtendedForwardRef<T, P> {
  if (displayName) {
    (component as ExtendedForwardRef<T, P>).displayName = displayName
  }
  return component as ExtendedForwardRef<T, P>
}

// Helper function to add displayName safely
export function withDisplayName<T, P extends object = {}>(
  component: React.ForwardRefExoticComponent<P & React.RefAttributes<T>>,
  displayName: string
): ExtendedForwardRef<T, P> {
  const typedComponent = component as ExtendedForwardRef<T, P>
  typedComponent.displayName = displayName
  return typedComponent
}

// Common props interface with className
export interface ClassNameProps {
  className?: string
}

// Helper type for Radix UI primitive components
export type PrimitiveProps<
  T extends React.ElementType,
  P extends object = {}
> = React.ComponentPropsWithoutRef<T> & ClassNameProps & P 