
/**
 * React Exports - Centralized exports for React components and hooks
 * This file ensures React types and hooks are properly available throughout the application
 */

// Re-export React as both default and named export
import * as ReactModule from 'react';

// Create explicit exports to avoid TypeScript errors
export const {
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
  Component
} = ReactModule;

// Export React types
export type {
  FC,
  ReactNode,
  ReactElement,
  CSSProperties,
  FormEvent,
  MouseEvent,
  ChangeEvent,
  Ref,
  RefObject,
  MutableRefObject,
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentType,
  PropsWithChildren,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ElementRef,
  Dispatch,
  SetStateAction
} from 'react';

// Export React as default
export default ReactModule;
