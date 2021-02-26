import * as z from 'zod'
import {sanityCorsOrigin, tokenSpec} from './common'
import {shareReplay} from 'rxjs/operators'

const envVarMap = z.object({
  projectId: z.array(z.string()),
  dataset: z.array(z.string())
})

const deployHook = z.object({
  name: z.string().optional(),
  // The deploy hook url will be exposed on these env vars, e.g. SANITY_STUDIO_*, NEXT_PUBLIC_*
  envVars: z.array(z.string()).optional()
})

export const vercelDeployment = z.object({
  provider: z.literal('vercel'),
  corsOrigins: z.array(sanityCorsOrigin).optional(),
  deployHook: z.union([z.literal(true), deployHook]).optional(),
  tokens: z
    .array(
      tokenSpec.extend({
        envVar: z.string().optional()
      })
    )
    .optional(),
  // The env vars `SANITY_STUDIO_API_DATASET` and `SANITY_STUDIO_API_PROJECT_ID` will always be added
  envVars: envVarMap.optional(),
  studio: z.object({basePath: z.string()}).optional()
})
export type VercelDeployment = z.infer<typeof vercelDeployment>
