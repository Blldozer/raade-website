/**
 * React Exports - Centralized exports for React components and hooks
 * This file ensures React types and hooks are properly available throughout the application
 */

// Simple direct import of React - this pattern works well with React 18+
import React from 'react';

// Export everything from React that we need
export default React;

// Re-export all hooks and components directly
export const {
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
  createElement,
  Fragment,
  createContext,
  forwardRef,
  memo,
  StrictMode,
  Suspense,
  lazy,
  Component,
  version
} = React;
