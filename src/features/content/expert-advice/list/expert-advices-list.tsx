import { useMemo } from 'react'
import { TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import { getExpertAdvices } from '../../api'

import ExpertAdviceTitle from './expert-advice-title'
import CustomTable from '@/components/ui/custom-table'
import ExpertAdviceStatus from './expert-advice-status'
import ExpertAdviceAction from './expert-advice-action'
import ExpertAdviceDescription from './expert-advice-description'

import type { IExpertAdvice } from '../../types'

function ExpertAdvicesList() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = useMemo(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10)
    return isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
  }, [searchParams])

  const { data, isPending } = useQuery({
    queryKey: ['expert-advices', currentPage],
    queryFn: () => getExpertAdvices({ page_size: 10, page: currentPage }),
  })

  const handlePaginationChange = (page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('page', page.toString())
      return newParams
    })
  }

  const columns: TableColumnsType<IExpertAdvice> = [
    {
      title: t('Название'),
      key: 'title',
      dataIndex: 'title',
      className: 'w-1/2',
      render: (_, record) => <ExpertAdviceTitle {...record} />,
    },
    {
      title: t('Описание'),
      key: 'description',
      dataIndex: 'description',
      className: 'w-1/2',
      render: (_, record) => <ExpertAdviceDescription {...record} />,
    },
    {
      title: t('Статус'),
      key: 'status',
      dataIndex: 'status',
      width: 0,
      render: (_, record) => <ExpertAdviceStatus {...record} />,
    },
    {
      title: t('Действие'),
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => <ExpertAdviceAction {...record} />,
    },
  ]

  return (
    <CustomTable
      columns={columns}
      dataSource={data?.results}
      rowKey="id"
      bordered
      loading={isPending}
      className="custom-table-2"
      pagination={{
        current: currentPage,
        pageSize: 10,
        total: data?.count || 0,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],
        onChange: handlePaginationChange,
      }}
    />
  )
}

export default ExpertAdvicesList
