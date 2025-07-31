import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import { getInstagramContents } from '../../api'
import { getTableSortOrder } from '@/helpers/get-table-sort-order'

import InstagramTitle from './instagram-title'
import InstagramAction from './instagram-action'
import InstagramStatus from './instagram-status'
import CustomTable from '@/components/ui/custom-table'
import InstagramDescription from './instagram-description'

import type { IInstagramContent } from '../../types'
import type { TableColumnsType, TablePaginationConfig } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

function InstagramTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page') || '1')
  const orderingParam = searchParams.get('ordering') || ''
  const orderingFields = orderingParam.split(',').filter(Boolean)

  const { data, isPending } = useQuery({
    queryKey: ['instagram-contents', currentPage, orderingParam],
    queryFn: () =>
      getInstagramContents({
        page_size: 10,
        page: currentPage,
        ordering: orderingFields.join(',') || undefined,
      }),
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<IInstagramContent> | SorterResult<IInstagramContent>[],
  ) => {
    const sorterArray = Array.isArray(sorter) ? sorter : [sorter]

    const newOrdering = sorterArray
      .filter(s => s.order)
      .map(s => (s.order === 'ascend' ? s.field : `-${s.field}`))

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)

      const newPage = pagination.current ?? 1
      newParams.set('page', newPage.toString())

      if (newOrdering.length > 0) {
        newParams.set('ordering', newOrdering.join(','))
      } else {
        newParams.delete('ordering')
      }

      return newParams
    })
  }

  const columns: TableColumnsType<IInstagramContent> = [
    {
      title: t('Название'),
      key: 'name',
      dataIndex: 'name',
      className: 'w-1/2',
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'title'),
      render: (_, record) => <InstagramTitle {...record} />,
    },
    {
      title: t('Описание'),
      key: 'description',
      dataIndex: 'description',
      className: 'w-1/2',
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'description'),
      render: (_, record) => <InstagramDescription {...record} />,
    },
    {
      title: t('Статус'),
      key: 'status',
      dataIndex: 'status',
      width: 0,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'status'),
      render: (_, record) => <InstagramStatus {...record} />,
    },
    {
      title: t('Действие'),
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => <InstagramAction {...record} />,
    },
  ]

  return (
    <CustomTable
      bordered
      rowKey="id"
      className="custom-table-2"
      loading={isPending}
      columns={columns}
      currentPage={currentPage}
      totalCount={data?.count}
      dataSource={data?.results}
      onChange={handleTableChange}
    />
  )
}

export default InstagramTable
