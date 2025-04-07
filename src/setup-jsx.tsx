/**
 * React JSX Setup
 * 
 * This file ensures that React is properly loaded for JSX components
 * Import this at the top of any component files that use JSX
 */

// Import React module
import React from 'react';

// Re-export common hooks for easy access
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
  useDebugValue
} = React;

// Create a standard way to import React
export default React;
