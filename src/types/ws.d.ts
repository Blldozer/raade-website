/**
 * Type definitions for the ws (WebSocket) library
 * This is a simplified definition to fix TypeScript errors
 */

declare module 'ws' {
  import { EventEmitter } from 'events';
  import * as http from 'http';
  import * as net from 'net';
  import * as stream from 'stream';

  class WebSocket extends EventEmitter {
    static readonly CONNECTING: number;
    static readonly OPEN: number;
    static readonly CLOSING: number;
    static readonly CLOSED: number;

    binaryType: string;
    readonly bufferedAmount: number;
    readonly extensions: string;
    readonly protocol: string;
    readonly readyState: number;
    readonly url: string;

    constructor(
      address: string | URL,
      protocols?: string | string[],
      options?: WebSocket.ClientOptions
    );

    close(code?: number, data?: string | Buffer): void;
    ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    send(data: any, cb?: (err?: Error) => void): void;
    send(
      data: any,
      options: { mask?: boolean; binary?: boolean; compress?: boolean; fin?: boolean },
      cb?: (err?: Error) => void
    ): void;

    on(event: 'close', listener: (code: number, reason: string) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'message', listener: (data: WebSocket.Data) => void): this;
    on(event: 'open', listener: () => void): this;
    on(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
  }

  namespace WebSocket {
    interface ClientOptions {
      protocol?: string;
      handshakeTimeout?: number;
      perMessageDeflate?: boolean | PerMessageDeflateOptions;
      localAddress?: string;
      protocolVersion?: number;
      headers?: { [key: string]: string };
      origin?: string;
      agent?: http.Agent;
      host?: string;
      family?: number;
      checkServerIdentity?(servername: string, cert: object): boolean;
      rejectUnauthorized?: boolean;
      maxPayload?: number;
      followRedirects?: boolean;
    }

    interface PerMessageDeflateOptions {
      serverNoContextTakeover?: boolean;
      clientNoContextTakeover?: boolean;
      serverMaxWindowBits?: number;
      clientMaxWindowBits?: number;
      zlibDeflateOptions?: {
        flush?: number;
        finishFlush?: number;
        chunkSize?: number;
        windowBits?: number;
        level?: number;
        memLevel?: number;
        strategy?: number;
        dictionary?: Buffer | Buffer[] | DataView;
        info?: boolean;
      };
      threshold?: number;
      concurrencyLimit?: number;
    }

    type Data = string | Buffer | ArrayBuffer | Buffer[];
  }

  export = WebSocket;
}
