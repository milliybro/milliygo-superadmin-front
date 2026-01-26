export interface IScheduler {
  periodicity: 'DAILY' | 'WEEKLY' | 'MONTHLY '
  day?: number
  scheduleHours: number[]
  name: 'string'
}

export interface ISchedulerResponse extends IScheduler {
  id: number
  isActive: boolean
}


export interface ISchedulerFormData extends IScheduler {
  id?:number,
  isActive?:boolean,
}

export interface ISchedulerParams extends Partial<ISchedulerResponse> {
  page_size?: number
  page?: number
}
