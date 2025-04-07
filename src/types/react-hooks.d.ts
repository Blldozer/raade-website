/**
 * React Hooks Type Declarations
 * 
 * This file provides type declarations for React hooks to ensure TypeScript properly
 * recognizes them when imported from 'react'.
 */

import React from 'react';

declare module 'react' {
  // Re-export React hooks with their proper types
  export const useState: typeof React.useState;
  export const useEffect: typeof React.useEffect;
  export const useContext: typeof React.useContext;
  export const useReducer: typeof React.useReducer;
  export const useCallback: typeof React.useCallback;
  export const useMemo: typeof React.useMemo;
  export const useRef: typeof React.useRef;
  export const useImperativeHandle: typeof React.useImperativeHandle;
  export const useLayoutEffect: typeof React.useLayoutEffect;
  export const useDebugValue: typeof React.useDebugValue;
  export const useDeferredValue: typeof React.useDeferredValue;
  export const useTransition: typeof React.useTransition;
  export const useId: typeof React.useId;
  export const useSyncExternalStore: typeof React.useSyncExternalStore;
  export const useInsertionEffect: typeof React.useInsertionEffect;
  
  // Export React types
  export type ReactNode = React.ReactNode;
  export type ReactElement = React.ReactElement;
  export type RefObject<T> = React.RefObject<T>;
  export type MutableRefObject<T> = React.MutableRefObject<T>;
  export type Ref<T> = React.Ref<T>;
  export type RefCallback<T> = React.RefCallback<T>;
}
