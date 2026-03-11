import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import { getExpertAdvices } from '../../api'
import { getTableSortOrder } from '@/helpers/get-table-sort-order'

import ExpertAdviceTitle from './expert-advice-title'
import CustomTable from '@/components/ui/custom-table'
import ExpertAdviceStatus from './expert-advice-status'
import ExpertAdviceAction from './expert-advice-action'
import ExpertAdviceDescription from './expert-advice-description'

import type { IExpertAdvice } from '../../types'
import type { TableColumnsType, TablePaginationConfig } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

function ExpertAdvicesList() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page') || '1')
  const orderingParam = searchParams.get('ordering') || ''
  const orderingFields = orderingParam.split(',').filter(Boolean)

  const { data, isPending } = useQuery({
    queryKey: ['expert-advices', currentPage, orderingParam],
    queryFn: () =>
      getExpertAdvices({
        page_size: 10,
        page: currentPage,
        ordering: orderingFields.join(',') || undefined,
      }),
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<IExpertAdvice> | SorterResult<IExpertAdvice>[],
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

  const columns: TableColumnsType<IExpertAdvice> = [
    {
      title: t('fields.name.label'),
      dataIndex: 'title',
      width: 1000,
      render: (_, record) => <ExpertAdviceTitle {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'title'),
    },
    {
      title: t('fields.description.label'),
      dataIndex: 'description',
      width: 1000,
      render: (_, record) => <ExpertAdviceDescription {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'description'),
    },
    {
      title: t('fields.status.label'),
      dataIndex: 'status',
      width: 0,
      render: (_, record) => <ExpertAdviceStatus {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'status'),
    },
    {
      title: t('common.action'),
      dataIndex: 'action',
      width: 0,
      render: (_, record) => <ExpertAdviceAction {...record} />,
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

export default ExpertAdvicesList
