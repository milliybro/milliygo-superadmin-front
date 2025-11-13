import { truthyObject } from '@/helpers/truthy-object'
import { useMutation, useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { ReactNode, useMemo } from 'react'
import { useLocation } from 'react-router'
import { GuideContext } from '.'
import { getGuides, updateGuide } from '../api'
import { GuideUpdatePayload } from '../types'

export default function GuideProvider({ children }: { children: ReactNode }) {
  const { search } = useLocation()
  const query = useMemo(() => queryString.parse(search), [search])

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
