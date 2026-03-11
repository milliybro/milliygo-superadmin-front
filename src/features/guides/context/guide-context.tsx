import { truthyObject } from '@/helpers/truthy-object'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { GuideContext } from '.'
import { getGuides, updateGuide } from '../api'
import { GuideUpdatePayload } from '../types'

export default function GuideProvider({ children }: { children: ReactNode }) {
  const query = useParsedQuery()

  const {
    data: guides,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['guides-data', query.page, query.guide_status],
    queryFn: async () => {
      const res = await getGuides(
        truthyObject({
          page_size: 10,
          ...query,
        }),
      )
      return res
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, ...values }: GuideUpdatePayload & { id: number }) =>
      updateGuide(id, values),
    onSuccess: () => {
      refetch?.()
    },
  })

  return (
    <GuideContext.Provider
      value={{
        guides: { data: guides, isLoading, refetch },
        updateGuide: { mutate, isPending },
      }}
    >
      {children}
    </GuideContext.Provider>
  )
}
