import * as z from 'zod'

import {netlifyDeployment} from './netlify'
import {vercelDeployment} from './vercel'
import {templateMedia, templateTechnology} from './common'

export const supportedDeploymentProvider = z.union([netlifyDeployment, vercelDeployment])
export type SupportedDeploymentProvider = z.infer<typeof supportedDeploymentProvider>

export type TemplateTechnology = z.infer<typeof templateTechnology>

export const templateManifest = z.object({
  version: z.literal(2),
  title: z.string(),
  description: z.string(),
  // Optional url to a live demo
  demoUrl: z.string().optional(),
  previewMedia: templateMedia.optional(),
  deployment: supportedDeploymentProvider.optional(),
  technologies: z.array(templateTechnology).optional()
})
export type TemplateManifest = z.infer<typeof templateManifest>
