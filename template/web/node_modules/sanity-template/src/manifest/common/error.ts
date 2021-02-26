export interface ManifestError {
  path: (string | number)[]
  message: string
}

export type Valid<Manifest> = {type: 'valid'; manifest: Manifest}
export type Invalid = {type: 'invalid'; errors: ManifestError[]; manifest: unknown}
