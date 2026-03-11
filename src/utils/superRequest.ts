import axios from 'axios'
import settings from '@/config/settings'

import type { AxiosError } from 'axios'

type Lang = 'ru' | 'uz' | 'uz-cyrillic'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

export const baseURL =
  hostname === 'admin.sayohat.uz'
    ? 'https://back.sayohat.uz/superadmin/api/v1'
    : 'https://superapi.emehmon.xdevs.uz/api/v1'

const requestSuper = axios.create({
  baseURL: baseURL,
  timeout: settings.requestTimeout,
})

requestSuper.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  const cookie = document?.cookie
    ?.split('; ')
    ?.find(row => row.startsWith('csrftoken='))
    ?.split('=')[1]

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // const locale = localStorage.getItem('i18nextLng')
  // config.headers['Accept-Language'] =
  //   locale === 'uz'
  //     ? 'uz-cyrillic'
  //     : locale === 'oz'
  //       ? 'uz-latin'
  //       : locale || 'ru'
  if (!config.headers['Accept-Language']) {
    const locale = localStorage.getItem('i18nextLng')
    config.headers['Accept-Language'] =
      locale === 'uz'
        ? 'uz-cyrillic'
        : locale === 'oz'
          ? 'uz-latin'
          : locale || 'ru'
  }

  if (cookie !== null) {
    config.headers['X-CSRFToken'] = cookie
  }

  // config.validateStatus = (status) => status < 500;

  return config
}, errorHandler)

requestSuper.interceptors.response.use(response => response.data, errorHandler)

export async function errorHandler(error: AxiosError): Promise<void> {
  if (error.response) {
    return Promise.reject(error.response)
  }

  if (error.request) {
    return Promise.reject({
      status: 0,
      data: [
        {
          error_type: 'NetworkError',
          detail: getDefaultErrorMessage(),
        },
      ],
    })
  }

  return Promise.reject({
    status: 0,
    data: [
      {
        error_type: 'UnexpectedError',
        detail: error.message,
      },
    ],
  })
}

export default requestSuper

function getDefaultErrorMessage() {
  const locale = localStorage.getItem('i18nextLng')

  const messages: Record<Lang, string> = {
    ru: 'Нет ответа от сервера',
    uz: 'Serverdan javob kelmadi',
    'uz-cyrillic': 'Сервердан жавоб келмади',
  }

  let lang: Lang = 'ru'

  if (locale === 'uz') lang = 'uz-cyrillic'
  else if (locale === 'oz') lang = 'uz'
  else if (locale === 'ru') lang = 'ru'

  return messages[lang]
}
