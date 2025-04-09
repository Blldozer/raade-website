/**
 * React Exports - Centralized exports for React components and hooks
 * This file ensures React types and hooks are properly available throughout the application
 */

import * as React from 'react';

// Export everything from React that we need
export default React;

// Export React types
export type { ReactNode, ErrorInfo } from 'react';

// Re-export hooks and components
export const useState = React.useState;
export const useEffect = React.useEffect;
export const useReducer = React.useReducer;
export const useRef = React.useRef;
export const useCallback = React.useCallback;
export const useMemo = React.useMemo;
export const useContext = React.useContext;
export const useLayoutEffect = React.useLayoutEffect;
export const useId = React.useId;
export const useImperativeHandle = React.useImperativeHandle;
export const useTransition = React.useTransition;
export const useSyncExternalStore = React.useSyncExternalStore;
export const useDebugValue = React.useDebugValue;
export const createElement = React.createElement;
export const Fragment = React.Fragment;
export const createContext = React.createContext;
export const forwardRef = React.forwardRef;
export const memo = React.memo;
export const StrictMode = React.StrictMode;
export const Suspense = React.Suspense;
export const lazy = React.lazy;
export const Component = React.Component;
