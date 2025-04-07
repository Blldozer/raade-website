// React hooks utility file
// This centralizes and re-exports all React hooks to ensure proper typing and exports

// Import React with proper type handling
import React from 'react';

// Extract all hooks and components from React using type assertion
// This ensures TypeScript recognizes these properties on the React object
const {
  createElement,
  Fragment,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  StrictMode,
  Component,
  createContext,
  memo,
  forwardRef,
  lazy,
  Suspense,
} = React as any;

// Create a typed default export
const ReactModule = {
  createElement,
  Fragment,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  StrictMode,
  Component,
  createContext,
  memo,
  forwardRef,
  lazy,
  Suspense,