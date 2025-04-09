
import * as React from 'react';

declare global {
  interface Window {
    __REACT_INITIALIZED?: boolean;
    React?: typeof React;
  }
}

// This empty export makes the file a module
export {};
