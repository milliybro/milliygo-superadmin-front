import { ListResponse } from '@/types'
import requestSuper from '@/utils/superRequest'
import { IAgentTourData, ITourAgents } from '../types'

export async function getTourAgentsList(
  params?: any,
): Promise<ListResponse<ITourAgents[]>> {
  const res: ListResponse<ITourAgents[]> = await requestSuper({
    url: '/tour-agents/',
    method: 'get',
    params,
  })

  return res
}

export async function getTourAgentTours(
  params?: any,
): Promise<ListResponse<IAgentTourData[]>> {
  const res: ListResponse<IAgentTourData[]> = await requestSuper({
    url: '/tour-agents/tours/',
    method: 'get',
    params,
  })

  return res
}

export async function getTourAgentEmployees(
  params?: any,
): Promise<ListResponse<IAgentTourData[]>> {
  const res: ListResponse<IAgentTourData[]> = await requestSuper({
    url: '/tour-agents/employees/',
    method: 'get',
    params,
  })

  return res
}
