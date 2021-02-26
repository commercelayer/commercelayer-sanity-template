import {Subscription, MutationEvent, Config, ApiError} from './types'

export function listen(
  EventSourceImpl: typeof EventSource,
  config: Config,
  handlers: {
    open: () => void
    error: (err: Error) => void
    next: (event: MutationEvent) => void
  }
): Subscription {
  const {projectId, dataset, token} = config
  const headers = token ? {Authorization: `Bearer ${token}`} : undefined
  const url = `https://${projectId}.api.sanity.io/v1/data/listen/${dataset}?query=*&effectFormat=mendoza`
  const es = new EventSourceImpl(url, {withCredentials: true, headers} as any)

  es.addEventListener('welcome', handlers.open, false)

  es.addEventListener('mutation', getMutationParser(handlers.next), false)

  es.addEventListener(
    'channelError',
    (msg: any) => {
      es.close()

      let data
      try {
        data = JSON.parse(msg.data) as ApiError
      } catch (err) {
        handlers.error(new Error('Unknown error parsing listener message'))
        return
      }

      handlers.error(
        new Error(data.message || data.error || `Listener returned HTTP ${data.statusCode}`)
      )
    },
    false
  )

  es.addEventListener(
    'error',
    () => {
      const origin = typeof window !== 'undefined' && window.location.origin
      const hintSuffix = origin ? `, and that the CORS-origin (${origin}) is allowed` : ''
      handlers.error(
        new Error(
          `Error establishing listener - check that the project ID and dataset are correct${hintSuffix}`
        )
      )
    },
    false
  )

  return {
    unsubscribe: (): Promise<void> => Promise.resolve(es.close()),
  }
}

function getMutationParser(cb: (event: MutationEvent) => void): (msg: any) => void {
  return (msg: any) => {
    let data
    try {
      data = JSON.parse(msg.data)
    } catch (err) {
      // intentional noop
      return
    }

    cb(data)
  }
}
