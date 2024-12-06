import axios from 'axios'

import { BASE_URL, TOKEN } from '../config/constants'

import type { AxiosError } from 'axios'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 180000, // 3 mins
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN.ACCESS)

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // config.validateStatus = (status) => status < 500;

  return config
}, errorHandler)

request.interceptors.response.use(response => response.data, errorHandler)

export async function errorHandler(error: AxiosError): Promise<void> {
  if (error.response !== null) {
    if (error.response?.status === 403) {
      const rToken = localStorage.getItem(TOKEN.REFRESH)

      if (rToken !== null) {
        try {
          //   const res = await refreshToken({ refresh: rToken })
          //   const { refresh, access } = res.data.auth_tokens
          //   localStorage.setItem(TOKEN.REFRESH, refresh)
          //   localStorage.setItem(TOKEN.ACCESS, access)
        } catch (err) {
          localStorage.setItem('refresh_token_error', JSON.stringify(err))
          localStorage.removeItem(TOKEN.REFRESH)
          localStorage.removeItem(TOKEN.ACCESS)
        } finally {
          window.location.reload()
        }
      }
    }

    await Promise.reject(error.response)
  }
  if (error.request !== null) {
    await Promise.reject(error.request)
  }

  console.error(error.message)

  console.log('Error config object:', error.config)

  console.log('\nError object as json:', error.toJSON())

  await Promise.reject(error)
}

export default request
