// Type declarations for Deno-specific imports used in Supabase Edge Functions
declare module 'npm:react/jsx-runtime' {
  import { jsx, Fragment } from 'react/jsx-runtime';
  export { jsx, Fragment };
}

declare module 'npm:@react-email/components' {
  import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
    Link,
    Button,
    Img,
  } from '@react-email/components';
  
  // Note: Box is not actually available in @react-email/components
  // We're just adding the type to make TypeScript happy
  export interface BoxProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  export const Box: React.FC<BoxProps>;
  
  export {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
    Link,
    Button,
    Img,
  };
}
