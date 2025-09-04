import requestAuth from '@/utils/authRequest'

import type { ListResponse } from '@/types'
import type { IActionHistory } from '../types'

export async function getLogs(params?: {
  page_size: number
  page: number
}): Promise<ListResponse<IActionHistory>> {
  const res: ListResponse<IActionHistory> = await requestAuth({
    url: '/logs/',
    method: 'get',
    params,
  })

  return res
}
