

import type { ListResponse } from '@/types'
import type { IActionHistory } from '../types'
import requestSuper from '@/utils/superRequest'

export async function getLogs(params?: {
  page_size: number
  page: number
}): Promise<ListResponse<IActionHistory>> {
  const res: ListResponse<IActionHistory> = await requestSuper({
    url: '/logs/',
    method: 'get',
    params,
  })

  return res
}
