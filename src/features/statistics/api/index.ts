import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { InfrastructureCard } from '../types'

export async function getInfrastructureCard(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/tourist/infrastructure/card/',
    method: 'get',
    params,
  })

  return res
}

export async function getInfrastructureChart(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/tourist/infrastructure/chart/',
    method: 'get',
    params,
  })

  return res
}
