import type { ComponentPropsWithoutRef, ElementRef, ComponentProps, ReactNode, ForwardRefExoticComponent } from 'react'
import type { Primitive } from '@radix-ui/react-primitive'

// Common component props
export type BaseProps = {
  className?: string
  children?: ReactNode
}

// Primitive component props
export type PrimitiveProps<E extends React.ElementType> = ComponentPropsWithoutRef<E> & {
  asChild?: boolean
  className?: string
}

// Slot component props
export type SlotProps = {
  children?: ReactNode
  className?: string
}

// Radix UI component props
export type RadixProps<T extends React.ElementType> = ComponentProps<T> & {
  className?: string
  children?: ReactNode
}

// Common component ref types
export type Ref<T> = { current: T | null } | ((instance: T | null) => void) | null

// Primitive ref
export type PrimitiveRef<E extends React.ElementType> = React.ComponentPropsWithRef<E>['ref']

// Component with ref
export type WithRef<T extends ForwardRefExoticComponent<any>> = T & { ref?: Ref<ElementRef<T>> }

// Display name
export interface WithDisplayName {
  displayName?: string
}

// Radix UI specific types
export type RadixRootProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  className?: string
  children?: ReactNode
}

export type RadixContentProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  className?: string
  children?: ReactNode
}

export type RadixTriggerProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  className?: string
  children?: ReactNode
}

export type RadixItemProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  className?: string
  children?: ReactNode
} 