export function assertEnvSupport(): void {
  const required = ['EventSource', 'ReadableStream', 'fetch']
  const unsupported = required.filter((api) => !(api in window))

  if (unsupported.length > 0) {
    throw new Error(`Browser not supported. Missing browser APIs: ${unsupported.join(', ')}`)
  }
}
