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

export async function getCompanyCard(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/tourist/company/card/',
    method: 'get',
    params,
  })

  return res
}

export async function getCompanyChart(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/tourist/company/chart/',
    method: 'get',
    params,
  })

  return res
}

export async function getInboundTourismCard(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/inbound/tourism/card/',
    method: 'get',
    params,
  })

  return res
}

export async function getInboundPurpose(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/inbound/tourism/foreign/citizen/purpose/',
    method: 'get',
    params,
  })

  return res
}

export async function getTopCountry(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/inbound/tourism/top/countries/',
    method: 'get',
    params,
  })

  return res
}
