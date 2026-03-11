import billingRequest from '@/features/billing/billingRequest.ts'
import {
  IScheduler,
  ISchedulerParams,
  ISchedulerResponse,
} from '@/features/billing/views/scheduler/types'

export  function getSchedulerList(params:ISchedulerParams):Promise<ISchedulerResponse[]> {
   return billingRequest.get('/api/v1/scheduler', { params })
}

export  function getSchedulerItem(id:number) {
  return  billingRequest.get<IScheduler>( `/api/v1/scheduler/${id}`)
}


export function updateScheduler(id:number,formData:IScheduler) {
  return billingRequest.put(`/api/v1/scheduler/${id}`, formData)
}

export function updateSchedulerStatus(id:number,formData:Pick<ISchedulerResponse,'isActive'>) {
  return billingRequest.patch(`/api/v1/scheduler/${id}`, formData)
}

export function deleteScheduler(id:number) {
  return billingRequest.delete(`/api/v1/scheduler/${id}`)
}


export function createScheduler(formData:IScheduler) {
  return billingRequest.post(`/api/v1/scheduler`, formData)
}