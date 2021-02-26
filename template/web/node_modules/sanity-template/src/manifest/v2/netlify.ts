import * as z from 'zod'

import {templateMedia, sanityCorsOrigin, tokenSpec} from './common'

export const providerRequirement = z.literal('build-hook') // Add future requirement flags here
export type ProviderRequirement = z.infer<typeof providerRequirement>

const netlifySite = z.object({
  id: z.string(),
  type: z.union([z.literal('studio'), z.literal('web')]),
  title: z.string(),
  description: z.string().optional(),
  dir: z.string(),
  buildSettings: z
    .object({
      base: z.string().optional(),
      dir: z.string().optional(),
      cmd: z.string().optional()
    })
    .optional(),
  requiredTokens: z.array(tokenSpec).optional(),
  requirements: z.array(providerRequirement).optional(),
  previewMedia: templateMedia.optional(),
  requiredCorsOrigins: z.array(sanityCorsOrigin).optional()
})
export type NetlifySite = z.infer<typeof netlifySite>

export const netlifyDeployment = z.object({
  provider: z.literal('netlify'),
  sites: z.array(netlifySite)
})
export type NetlifyDeployment = z.infer<typeof netlifyDeployment>
