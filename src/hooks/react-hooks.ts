// React hooks utility file
// This centralizes and re-exports all React hooks to ensure proper typing and exports

import {
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
  // Add any other hooks you're using in the project
} from 'react';

// Create a React-like default export using the named exports
const React = {
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
  useTransition
};

// Export as default
export default React;

// Re-export all hooks
export {
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
};
