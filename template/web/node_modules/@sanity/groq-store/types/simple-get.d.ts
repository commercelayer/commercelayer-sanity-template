// _Partial_ type definitions for simple-get

/// <reference types="node" />
declare module 'simple-get' {
  import {IncomingMessage} from 'http'

  interface Options {
    url: string
    headers?: Record<string, string>
  }

  function simpleGet(
    options: Options,
    callback: (err: Error | undefined, res: IncomingMessage) => void
  ): void

  export = simpleGet
}
