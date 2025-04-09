import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    }
  }
}

declare module 'react' {
  export interface ReactNode {}
  export interface ErrorInfo {}
  export function useRef<T = any>(initialValue?: T): React.MutableRefObject<T>;
  export function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  export function useState<T>(initialState: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>];
} 