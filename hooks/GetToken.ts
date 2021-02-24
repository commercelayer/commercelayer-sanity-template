import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getSalesChannelToken } from '@commercelayer/js-auth'

type UseGetToken = {
  (args: {
    clientId: string
    endpoint: string
    scope?: string
    countryCode: string
  }): string
}

export const useGetToken: UseGetToken = ({
  clientId,
  endpoint,
  countryCode,
  scope = 'market:all',
}) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    const getCookieToken = Cookies.get(`clAccessToken-${countryCode}`)
    if (!getCookieToken && clientId && endpoint) {
      const getToken = async () => {
        const auth = await getSalesChannelToken({
          clientId,
          endpoint,
          scope, // NOTE: take it from country
        })
        setToken(auth?.accessToken as string) // TODO: add to LocalStorage
        Cookies.set(
          `clAccessToken-${countryCode}`,
          auth?.accessToken as string,
          {
            // @ts-ignore
            expires: auth?.expires,
          }
        )
      }
      getToken()
    } else {
      setToken(getCookieToken || '')
    }
  })
  return token
}
