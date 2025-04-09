/**
 * React type declarations file
 * This provides proper typing for React components and JSX in the project
 */

import * as React from 'react';
import React from 'react';

declare global {
  // Declare the global JSX namespace to ensure JSX is properly recognized
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    
    // Adds intrinsic elements like 'div', 'span', etc.
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Re-export React to make it available as a global
declare module 'react' {
  export = React;
  export as namespace React;

  namespace React {
    type ReactNode = React.ReactElement | string | number | boolean | null | undefined | ReactNodeArray;
    interface ReactNodeArray extends Array<ReactNode> {}
    
    interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
      type: T;
      props: P;
      key: Key | null;
    }

    type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);
    
    type Key = string | number;

    interface RefObject<T> {
      readonly current: T | null;
    }

    interface MutableRefObject<T> {
      current: T;
    }

    function useRef<T = undefined>(): MutableRefObject<T | undefined>;
    function useRef<T>(initialValue: T): MutableRefObject<T>;
    function useRef<T = undefined>(): RefObject<T>;

    type EffectCallback = () => (void | (() => void | undefined));
    type DependencyList = ReadonlyArray<any>;

    function useEffect(effect: EffectCallback, deps?: DependencyList): void;

    // Define Component class with proper typing for props and state
    class Component<P = {}, S = {}> {
      constructor(props: P);
      readonly props: P;
      state: S;
      setState<K extends keyof S>(
        state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
        callback?: () => void
      ): void;
      forceUpdate(callback?: () => void): void;
      render(): ReactNode;
      readonly context: any;
      readonly refs: { [key: string]: any };
    }
  }
}

// Add declarations for framer-motion
declare module 'framer-motion' {
  export const motion: {
    div: React.ForwardRefExoticComponent<any>;
    span: React.ForwardRefExoticComponent<any>;
    section: React.ForwardRefExoticComponent<any>;
    button: React.ForwardRefExoticComponent<any>;
    a: React.ForwardRefExoticComponent<any>;
    header: React.ForwardRefExoticComponent<any>;
    footer: React.ForwardRefExoticComponent<any>;
    img: React.ForwardRefExoticComponent<any>;
    svg: React.ForwardRefExoticComponent<any>;
    path: React.ForwardRefExoticComponent<any>;
    [key: string]: React.ForwardRefExoticComponent<any>;
  };
  export const AnimatePresence: React.FC<any>;
  export const useAnimation: () => any;
  export const useMotionValue: (initialValue: number) => any;
  export const useTransform: (value: any, input: number[], output: any[]) => any;
  export const useCycle: <T>(...args: T[]) => [T, (i?: number) => void];
}

// Add declarations for lucide-react
declare module 'lucide-react' {
  export const ArrowLeftRight: React.FC<any>;
  export const ArrowRight: React.FC<any>;
  export const ArrowLeft: React.FC<any>;
  export const ChevronDown: React.FC<any>;
  export const ChevronUp: React.FC<any>;
  export const ChevronRight: React.FC<any>;
  export const ChevronLeft: React.FC<any>;
  export const X: React.FC<any>;
  export const Menu: React.FC<any>;
  
  // Add a catch-all for other icons - export as namespace instead of invalid syntax
  interface IconComponent extends React.FC<any> {}
  const Icon: { [key: string]: IconComponent };
  export default Icon;
}

declare module 'react' {
  export interface ReactNode {}
  export interface ErrorInfo {
    componentStack: string;
  }
  
  export function useRef<T = any>(initialValue?: T): React.MutableRefObject<T>;
  export function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  export function useState<T>(initialState: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>];
  
  export interface DetailedHTMLProps<E extends HTMLAttributes<T>, T> extends HTMLAttributes<T> {
    ref?: LegacyRef<T>;
  }
  
  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    id?: string;
    style?: React.CSSProperties;
  }
  
  export interface DOMAttributes<T> {
    children?: ReactNode;
    dangerouslySetInnerHTML?: {
      __html: string;
    };
  }
  
  export interface AriaAttributes {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
  }
  
  export type LegacyRef<T> = string | ((instance: T | null) => void) | React.RefObject<T> | null;
  
  export interface RefObject<T> {
    readonly current: T | null;
  }
  
  export interface MutableRefObject<T> {
    current: T;
  }
  
  export type EffectCallback = () => void | (() => void);
  export type DependencyList = ReadonlyArray<any>;
  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);
}
