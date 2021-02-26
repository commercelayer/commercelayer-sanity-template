module.exports = {
  env: {jest: true},
  extends: ['standard', 'plugin:import/errors', 'plugin:import/warnings', 'prettier'],
  rules: {
    'object-curly-spacing': ['error', 'never']
  }
}
