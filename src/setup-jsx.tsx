
/**
 * React JSX Setup
 * 
 * This file ensures that React is properly loaded for JSX components
 * Import this at the top of any component files that use JSX
 */

// Import from our centralized React exports
import React, {
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
  useDebugValue
} from './react-exports';

// Create a standard way to import React
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
  useDebugValue
};

export default React;
