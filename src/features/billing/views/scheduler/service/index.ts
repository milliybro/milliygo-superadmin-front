import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query'
import {
  createScheduler,
  deleteScheduler,
  getSchedulerItem,
  getSchedulerList,
  updateScheduler,
  updateSchedulerStatus,
} from '@/features/billing/views/scheduler/api'
import {
  IScheduler,
  ISchedulerFormData,
  ISchedulerParams,
  ISchedulerResponse,
} from '@/features/billing/views/scheduler/types'

export function useSchedulerGetList(params: ISchedulerParams) {
  return useQuery({
    queryKey: ['SCHEDULER_LIST',params],
    queryFn: () => getSchedulerList(params),
  })
}

export function useSchedulerGetItem(id: number) {
  return useQuery({
    queryKey: ['SCHEDULER_ITEM'],
    queryFn: () => getSchedulerItem(id),
  })
}

export function useSchedulerUpdateMutation(
  mutationOptions: MutationOptions<unknown, Error,  Required<ISchedulerFormData>> = {},
) {
  return useMutation({
    mutationFn: (formData: Required<ISchedulerFormData>) =>
      updateScheduler(formData.id, formData),
    ...mutationOptions,
  })
}

export function useSchedulerUpdateStatusMutation(
  mutationOptions: MutationOptions<
    unknown,
    Error,
    Pick<ISchedulerResponse, 'isActive' | 'id'>
  > = {},
) {
  return useMutation({
    mutationFn: (formData: Pick<ISchedulerResponse, 'isActive' | 'id'>) =>
      updateSchedulerStatus(formData.id, formData),
    ...mutationOptions,
  })
}

export function useSchedulerCreateMutation(
  mutationOptions: MutationOptions<unknown, Error, IScheduler> = {},
) {
  return useMutation({
    mutationFn: (formData: IScheduler) => createScheduler(formData),
    ...mutationOptions,
  })
}

export function useSchedulerDeleteMutation(
  mutationOptions: MutationOptions<unknown, Error, number> = {},
) {
  return useMutation({
    mutationFn: (id: number) => deleteScheduler(id),
    ...mutationOptions,
  })
}
