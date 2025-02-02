// src/types/glsl.d.ts
declare module '*.glsl' {
    const content: string;
    export default content;
  }

declare module '*.vert' {
  const value: string;
  export default value;
}

declare module '*.frag' {
  const value: string;
  export default value;
}