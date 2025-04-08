// setup-jsx.tsx
// This file provides centralized React import and re-exports
// to maintain consistent JSX support across all components

import React from 'react';

// Re-export individual hooks and utilities that we need
export const {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
  useReducer,
  createContext,
  forwardRef,
  memo,
  Fragment,
  createElement,
  cloneElement,
  isValidElement,
  Children
} = React;

// Export React as default
export default React;
