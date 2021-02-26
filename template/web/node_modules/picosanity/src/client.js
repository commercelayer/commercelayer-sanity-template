const enc = encodeURIComponent
const apiHost = 'api.sanity.io'
const cdnHost = 'apicdn.sanity.io'

function PicoSanity(config, fetcher) {
  if (!(this instanceof PicoSanity)) {
    return new PicoSanity(config)
  }

  this.clientConfig = config
  this.fetcher = fetcher
}

;[
  'clone',
  'create',
  'createIfNotExists',
  'createOrReplace',
  'delete',
  'listen',
  'mutate',
  'patch',
  'transaction',
].forEach((method) => {
  PicoSanity.prototype[method] = ni(method)
})

PicoSanity.prototype.config = function (cfg) {
  if (cfg) {
    this.clientConfig = Object.assign({}, this.clientConfig, cfg)
    return this
  }

  return this.clientConfig
}

PicoSanity.prototype.fetch = function (query, params) {
  const cfg = this.clientConfig
  const headers = cfg.token ? {Authorization: `Bearer ${cfg.token}`} : undefined
  const host = !cfg.useCdn || cfg.token ? apiHost : cdnHost
  const opts = {credentials: cfg.withCredentials ? 'include' : 'omit', headers}
  const qs = getQs(query, params)
  return this.fetcher(`https://${cfg.projectId}.${host}/v1/data/query/${cfg.dataset}${qs}`, opts)
    .then((res) => res.json())
    .then((res) => res.result)
}

function getQs(query, params) {
  const baseQs = `?query=${enc(query)}`
  return Object.keys(params || {}).reduce((current, param) => {
    return `${current}&${enc(`$${param}`)}=${enc(JSON.stringify(params[param]))}`
  }, baseQs)
}

function ni(method) {
  return () => {
    throw new Error(`Method "${method}" not implemented, use @sanity/client`)
  }
}

module.exports = PicoSanity
