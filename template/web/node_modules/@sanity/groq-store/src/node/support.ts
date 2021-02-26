export function assertEnvSupport(): void {
  const [major] = process.version.replace(/^v/, '').split('.', 1).map(Number)
  if (major < 10) {
    throw new Error('Node.js version 10 or higher required')
  }
}
