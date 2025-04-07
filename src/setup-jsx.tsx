/**
 * React JSX Setup
 * 
 * This file ensures that React is properly loaded for JSX components
 * Import this at the top of any component files that use JSX
 */

// Import React directly - this pattern works well with React 18+
import * as React from 'react';

// Import all hooks directly from React
const {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useMemo,
  useContext,
  useLayoutEffect,
  useId,
  useImperativeHandle,
  useTransition,
  useSyncExternalStore,
  useDebugValue,
  StrictMode,
  Component,
  createElement,
  Fragment,
  Suspense,
  createContext,
  memo,
  forwardRef,
  lazy
} = React;

// Re-export everything for use in components
export {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useMemo,
  useContext,
  useLayoutEffect,
  useId,
  useImperativeHandle,
  useTransition,
  useSyncExternalStore,
  useDebugValue,
  StrictMode,
  Component,
  createElement,
  Fragment,
  Suspense,
  createContext,
  memo,
  forwardRef,
  lazy
};

// Export React as default
export default React;
