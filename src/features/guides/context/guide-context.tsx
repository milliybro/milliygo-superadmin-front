import { truthyObject } from '@/helpers/truthy-object'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { ReactNode, useMemo } from 'react'
import { useLocation } from 'react-router'
import { GuideContext } from '.'
import { getGuides } from '../api'

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

  return (
    <GuideContext.Provider
      value={{ guides: { data: guides, isLoading, refetch } }}
    >
      {children}
    </GuideContext.Provider>
  )
}
