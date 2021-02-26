import * as z from 'zod'

export const templateTechnology = z.object({id: z.string(), name: z.string(), url: z.string()})
export type TemplateTechnology = z.infer<typeof templateTechnology>

export const templateImageMedia = z.object({
  type: z.literal('image'),
  alt: z.string(),
  src: z.string()
})

export type TemplateImageMedia = z.infer<typeof templateImageMedia>

// just keep as an alias for now
export const templateMedia = templateImageMedia
export type TemplateMedia = z.infer<typeof templateMedia>

export const tokenSpec = z.object({
  role: z.union([z.literal('deploy-studio'), z.literal('read'), z.literal('write')]),
  label: z.string()
})
export type TokenSpec = z.infer<typeof tokenSpec>

export const providerRequirement = z.literal('build-hook') // Add future requirement flags here

export const sanityCorsOrigin = z.object({origin: z.string(), allowCredentials: z.boolean()})
export type SanityCorsOrigin = z.infer<typeof sanityCorsOrigin>

export const netlify = z.object({
  name: z.literal('netlify'),
  config: z
    .object({
      base: z.string().optional(),
      dir: z.string().optional(),
      cmd: z.string().optional()
    })
    .optional(),
  requirements: z.array(providerRequirement).optional()
})
export type NetlifyDeployment = z.infer<typeof netlify>

export const deployment = z.object({
  id: z.string(),
  type: z.union([z.literal('studio'), z.literal('web')]),
  title: z.string(),
  description: z.string().optional(),
  dir: z.string(),
  provider: netlify,
  previewMedia: templateMedia,
  requiredCorsOrigins: z.array(sanityCorsOrigin).optional(),
  requiredTokens: z.array(tokenSpec).optional()
})
export type Deployment = z.infer<typeof deployment>

export const templateManifest = z.object({
  version: z.union([z.literal(1), z.literal(0)]),
  title: z.string(),
  description: z.string(),
  previewMedia: templateMedia.optional(),
  deployments: z.array(deployment),
  technologies: z.array(templateTechnology).optional()
})
export type TemplateManifest = z.infer<typeof templateManifest>
