import * as v1 from './v1'
import * as v2 from './v2'
import {current} from '..'

const convertDeployments = (deployments: v1.Deployment[]): v2.NetlifyDeployment => {
  return {
    provider: 'netlify',
    sites: deployments.map(
      (v1Deployment): v2.NetlifySite => {
        return {
          id: v1Deployment.id,
          type: v1Deployment.type,
          title: v1Deployment.title,
          description: v1Deployment.description,
          previewMedia: v1Deployment.previewMedia,
          buildSettings: v1Deployment.provider.config,
          dir: v1Deployment.dir,
          requiredCorsOrigins: v1Deployment.requiredCorsOrigins,
          requiredTokens: v1Deployment.requiredTokens,
          requirements: v1Deployment.provider.requirements
        }
      }
    )
  }
}

export function v1toV2(template: v1.TemplateManifest): v2.TemplateManifest {
  const {deployments, ...rest} = template
  return {
    ...rest,
    version: 2,
    deployment: convertDeployments(deployments)
  }
}

export function toCurrent(
  template: v1.TemplateManifest | v2.TemplateManifest
): current.TemplateManifest {
  return template.version === 2 ? template : v1toV2(template)
}

export function parse(allegedTemplate: any) {
  const version = allegedTemplate?.version
  if (typeof version !== 'number') {
    throw new Error('Invalid template manifest input: Version qualifier is missing or not a number')
  }
  if (version === 0 || version === 1) {
    return v1.parse(allegedTemplate)
  }
  if (version === 2) {
    return v2.parse(allegedTemplate)
  }
  throw new Error(`Invalid template manifest input: Unsupported version ${version}`)
}
