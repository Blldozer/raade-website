import {
  require_react
} from "./chunk-BYIBYIM7.js";
import {
  __toESM
} from "./chunk-HXA6O6EE.js";

// node_modules/@radix-ui/primitive/dist/index.mjs
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

// node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var React = __toESM(require_react(), 1);
var useLayoutEffect2 = Boolean(globalThis?.document) ? React.useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-id/dist/index.mjs
var React2 = __toESM(require_react(), 1);
var useReactId = React2["useId".toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
  const [id, setId] = React2.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var React3 = __toESM(require_react(), 1);
function useCallbackRef(callback) {
  const callbackRef = React3.useRef(callback);
  React3.useEffect(() => {
    callbackRef.current = callback;
  });
  return React3.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var React4 = __toESM(require_react(), 1);
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  }
}) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);
  const setValue = React4.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value2 = typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value2 !== prop) handleChange(value2);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const uncontrolledState = React4.useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React4.useRef(value);
  const handleChange = useCallbackRef(onChange);
  React4.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);
  return uncontrolledState;
}

export {
  composeEventHandlers,
  useLayoutEffect2,
  useId,
  useCallbackRef,
  useControllableState
};
//# sourceMappingURL=chunk-ETDJUS6E.js.map
