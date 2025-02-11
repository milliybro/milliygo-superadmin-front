import axios from 'axios'
import settings from '@/config/settings'
import { refreshToken } from '@/features/auth'

import type { AxiosError } from 'axios'

const request = axios.create({
  baseURL: settings.baseURL,
  timeout: settings.requestTimeout,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  const cookie = document?.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1]

  const locale = localStorage.getItem('i18nextLng')

  if (token !== null) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers['Accept-Language'] =
    locale === 'uz'
      ? 'uz-cyrillic'
      : locale === 'oz'
      ? 'uz-latin'
      : locale || 'ru'

  if (cookie !== null) {
    config.headers['X-CSRFToken'] = cookie
  }

  // config.validateStatus = (status) => status < 500;

  return config
}, errorHandler)

request.interceptors.response.use((response) => response.data, errorHandler)

export async function errorHandler(error: AxiosError): Promise<void> {
  if (error.response !== null) {
    // server responded with a status code that falls out of the range of 2xx
    if (error.response?.status === 403) {
      const rToken = localStorage.getItem('refresh_token')

      if (rToken !== null) {
        try {
          const res = await refreshToken({ refresh: rToken })
          const { refresh, access } = res.data.auth_tokens
          localStorage.setItem('refresh_token', refresh)
          localStorage.setItem('access_token', access)
        } catch (err) {
          localStorage.setItem('refresh_token_error', JSON.stringify(err))
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('access_token')
        } finally {
          window.location.reload()
        }
      }
    }

    await Promise.reject(error.response)
  }
  if (error.request !== null) {
    // no response received from server
    await Promise.reject(error.request)
  }

  // something happened in setting up the request
  console.error(error.message)

  console.log('Error config object:', error.config)

  // Using toJSON you get an object with more information about the HTTP error
  console.log('\nError object as json:', error.toJSON())

  await Promise.reject(error)
}

export default request
