
/**
 * Type definitions for react-countup
 * 
 * These extend the base types to include all the props that the library
 * actually supports but might not be included in its type definitions.
 */
import 'react-countup';

declare module 'react-countup' {
  export interface CountUpProps {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    useEasing?: boolean;
    useGrouping?: boolean;
    separator?: string;
    decimal?: string;
    prefix?: string;
    suffix?: string;
    delay?: number;
    className?: string;
    redraw?: boolean;
    preserveValue?: boolean;
    formattingFn?: (value: number) => string;
    onEnd?: () => void;
    onStart?: () => void;
    enableScrollSpy?: boolean;
    scrollSpyDelay?: number;
    scrollSpyOnce?: boolean;
  }
}
