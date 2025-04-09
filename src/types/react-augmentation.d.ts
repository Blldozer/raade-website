/**
 * React Type Augmentation
 * This file provides TypeScript type definitions for React components and hooks
 */

// Import React types
import 'react';

// Augment the React namespace with missing types
declare module 'react' {
  // Basic React types
  export type ReactNode = React.ReactElement | string | number | boolean | null | undefined | ReactNodeArray;
  export interface ReactNodeArray extends Array<ReactNode> {}
  export type ReactFragment = ReactNodeArray | ReactPortal | boolean | null | undefined;
  export interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }

  // React Element types
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  export type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  export type Key = string | number;

  // Component types
  export class Component<P = {}, S = {}> {
    constructor(props: P, context?: any);
    state: S;
    props: P & { children?: ReactNode };
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
  }

  // Hook types
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void | undefined), deps?: ReadonlyArray<any>): void;
  export function useContext<T>(context: Context<T>): T;
  export function useReducer<R extends Reducer<any, any>, I>(
    reducer: R,
    initialArg: I,
    init?: (arg: I) => ReducerState<R>
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
  export function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  export function useRef<T>(initialValue: T): MutableRefObject<T>;
  export function useLayoutEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;

  // Ref types
  export interface RefObject<T> {
    readonly current: T | null;
  }
  export interface MutableRefObject<T> {
    current: T;
  }
  
  // Context type
  export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }
  export interface Provider<T> {
    (props: ProviderProps<T>): ReactElement | null;
  }
  export interface Consumer<T> {
    (props: ConsumerProps<T>): ReactElement | null;
  }
  export interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
  }
  export interface ConsumerProps<T> {
    children: (value: T) => ReactNode;
  }
  
  // Reducer types
  export type Reducer<S, A> = (prevState: S, action: A) => S;
  export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
  export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
  export type Dispatch<A> = (value: A) => void;
  
  // React component exports
  export const Fragment: React.FC<{ children?: ReactNode }>;
  export const StrictMode: React.FC<{ children?: ReactNode }>;
  export const Suspense: React.FC<{ fallback: ReactNode; children?: ReactNode }>;
  
  // Helper functions
  export function createContext<T>(defaultValue: T): Context<T>;
  export function createElement(
    type: string | JSXElementConstructor<any>,
    props?: any,
    ...children: ReactNode[]
  ): ReactElement;
  export function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => ReactElement | null
  ): (props: P & { ref?: React.Ref<T> }) => ReactElement | null;
  export function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
  ): T;
  export function memo<P extends object>(
    Component: FunctionComponent<P>,
    propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
  ): FunctionComponent<P>;
}

// Additional helper types
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
type ComponentClass<P = {}> = new (props: P) => Component<P, any>;
type FunctionComponent<P = {}> = (props: P & { children?: React.ReactNode }) => React.ReactElement | null;
