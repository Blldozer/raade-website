
/**
 * React Import Helper
 * 
 * This utility provides a convenient way to import React and its hooks
 * throughout the application, ensuring proper TypeScript typing.
 */

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
  useReducer,
  useId,
  useImperativeHandle,
  Component,
  Suspense,
  lazy
} from '../react-exports';

import type {
  FC,
  ReactNode,
  ReactElement,
  ComponentProps,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  FormEvent,
  MouseEvent,
  ChangeEvent,
  Ref,
  RefObject,
  MutableRefObject
} from '../react-exports';

// Create a convenient object with all React exports
const R = {
  // Core React
  React,
  
  // Hooks
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
  useReducer,
  useId,
  useImperativeHandle,
  
  // Components
  Component,
  Suspense,
  lazy
};

// Export everything
export default R;
export {
  // Core React
  React,
  
  // Hooks
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
  useReducer,
  useId,
  useImperativeHandle,
  
  // Components
  Component,
  Suspense,
  lazy
};

// Export types
export type {
  FC,
  ReactNode,
  ReactElement,
  ComponentProps,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  FormEvent,
  MouseEvent,
  ChangeEvent,
  Ref,
  RefObject,
  MutableRefObject
};

// Add a helper function to check if React is available in the current context
export function isReactAvailable(): boolean {
  return typeof window !== 'undefined' && window.__REACT_INITIALIZED === true;
}
