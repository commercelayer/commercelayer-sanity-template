module.exports = {
  target: 'serverless',
  env: {
    JSCOV: 0,
    BUILD_LANGUAGES: process.env.BUILD_LANGUAGES,
    BUILD_CMS: process.env.BUILD_CMS,
    CL_CLIENT_ID: process.env.CL_CLIENT_ID,
    CL_ENDPOINT: process.env.CL_ENDPOINT,
  },
}
