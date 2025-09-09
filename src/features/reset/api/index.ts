import request from '@/utils/axios'

import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '../types'
// import requestChat from '@/utils/authRequest'
import requestAuth from '@/utils/authRequest'
import requestSuper from '@/utils/superRequest'

export async function login(data: {
  username: string
  password: string
}): Promise<AuthResponse> {
  const res: AuthResponse = await requestSuper({
    url: '/account/me/',
    method: 'post',
    data,
  })

  return res
}

export async function refreshToken(data: {
  refresh: string
}): Promise<AxiosResponse<AuthResponse>> {
  const res = await request({
    url: '/account/me/refresh/',
    method: 'post',
    data,
  })

  return res
}

export async function resetEmail(data: {
  email: string
}): Promise<AuthResponse> {
  const res: AuthResponse = await requestAuth({
    url: '/account/users/check_reset_password/',
    method: 'post',
    data,
  })

  return res
}

export async function confirmEmail(data: {
  email: string
  code: string
}): Promise<AuthResponse> {
  const res: AuthResponse = await requestAuth({
    url: '/account/verify-code/',
    method: 'post',
    data,
  })

  return res
}


export async function confirmPassword(data: {
  email: string
  password: string
}): Promise<AuthResponse> {
  const res: AuthResponse = await requestAuth({
    url: '/account/users/confirm_reset_password/',
    method: 'post',
    data,
  })

  return res
}
