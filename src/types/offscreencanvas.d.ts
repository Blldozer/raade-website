/**
 * Type definitions for OffscreenCanvas API
 * This is a simplified definition to fix TypeScript errors
 */

interface OffscreenCanvasRenderingContext2D extends CanvasRenderingContext2D {}

interface OffscreenCanvas extends EventTarget {
  width: number;
  height: number;
  getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): OffscreenCanvasRenderingContext2D | null;
  getContext(contextId: "webgl" | "webgl2", options?: WebGLContextAttributes): WebGLRenderingContext | null;
  convertToBlob(options?: ImageEncodeOptions): Promise<Blob>;
  transferToImageBitmap(): ImageBitmap;
}
