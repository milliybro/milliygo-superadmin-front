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

export async function getMuseumSalesCountry(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/inbound/tourism/tourists/museum/sales/by/country/',
    method: 'get',
    params,
  })

  return res
}

export async function getGroupCountryTourists(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/inbound/tourism/tourists/country/group/',
    method: 'get',
    params,
  })

  return res
}

export async function getInboundChart(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/inbound/tourism/chart/',
    method: 'get',
    params,
  })

  return res
}

export async function getSalesCountry(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/inbound/tourism/tourists/museum/sales/counties/',
    method: 'get',
    params,
  })

  return res
}

export async function getOutboundPurpose(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/outbound/tourism/local/citizen/any/purpose/',
    method: 'get',
    params,
  })

  return res
}

export async function getOutboundTopCountry(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/outbound/tourism/top/countries/',
    method: 'get',
    params,
  })

  return res
}

export async function getOutboundChart(
  params?: any,
): Promise<ListResponse<InfrastructureCard[]>> {
  const res: ListResponse<InfrastructureCard[]> = await request({
    url: '/statistics/outbound/tourism/chart/',
    method: 'get',
    params,
  })

  return res
}
