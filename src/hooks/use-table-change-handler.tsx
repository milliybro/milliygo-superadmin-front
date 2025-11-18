import { truthyObject } from '@/helpers/truthy-object'
import { TableProps } from 'antd'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router'
import { useParsedQuery } from './use-parsed-query'

export function useTableChangeHandler<T = any>() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queries = useParsedQuery()

  const handleTableChange: TableProps<T>['onChange'] = (
    pagination,
    _,
    sorter,
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort?.field
      : null

    const newPage = pagination?.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        page: newPage,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return handleTableChange
}
