/**
 * React 18.3.1 TypeScript Declaration Override
 * This file adds proper TypeScript support for React 18.3.1
 */

import 'react';

declare module 'react' {
  // Explicitly declare React.StrictMode
  namespace React {
    // Core components
    const StrictMode: React.ComponentType<React.PropsWithChildren<{}>>;
    const Suspense: React.ComponentType<React.PropsWithChildren<{ fallback: React.ReactNode }>>;
    const Fragment: React.ComponentType<React.PropsWithChildren<{}>>;
    const Component: any;
    
    // Core hooks
    function useState<T>(initialState: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>];
    function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
    function useContext<T>(context: React.Context<T>): T;
    function useReducer<R extends React.Reducer<any, any>>(
      reducer: R,
      initialState: React.ReducerState<R>,
      initializer?: (arg: React.ReducerState<R>) => React.ReducerState<R>
    ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
    function useCallback<T extends Function>(callback: T, deps: React.DependencyList): T;
    function useMemo<T>(factory: () => T, deps: React.DependencyList): T;
    function useRef<T>(initialValue: T): React.MutableRefObject<T>;
    function useRef<T>(initialValue: null | undefined): React.RefObject<T>;
    function useRef<T = undefined>(): React.MutableRefObject<T | undefined>;
    function useImperativeHandle<T, R extends T>(
      ref: React.Ref<T> | undefined,
      init: () => R,
      deps?: React.DependencyList
    ): void;
    function useLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
    function useDebugValue<T>(value: T, format?: (value: T) => any): void;
    function useId(): string;
    
    // Additional hooks
    function useTransition(): [boolean, React.TransitionStartFunction];
    function useDeferredValue<T>(value: T): T;
    function useSyncExternalStore<Snapshot>(
      subscribe: (onStoreChange: () => void) => () => void,
      getSnapshot: () => Snapshot,
      getServerSnapshot?: () => Snapshot
    ): Snapshot;
    
    // Core APIs
    function createElement(
      type: React.ElementType,
      props?: any,
      ...children: React.ReactNode[]
    ): React.ReactElement;
    function createContext<T>(defaultValue: T): React.Context<T>;
    function memo<P extends object>(
      Component: React.FunctionComponent<P>,
      propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
    ): React.FunctionComponent<P>;
    function forwardRef<T, P = {}>(
      render: (props: P, ref: React.ForwardedRef<T>) => React.ReactElement | null
    ): (props: P & { ref?: React.Ref<T> }) => React.ReactElement | null;
    function lazy<T extends React.ComponentType<any>>(
      factory: () => Promise<{ default: T }>
    ): T;
  }
  
  export = React;
}
