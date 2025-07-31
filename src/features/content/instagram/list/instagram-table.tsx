import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import { getInstagramContents } from '../../api'

import InstagramTitle from './instagram-title'
import InstagramAction from './instagram-action'
import InstagramStatus from './instagram-status'
import CustomTable from '@/components/ui/custom-table'
import InstagramDescription from './instagram-description'

import type { TableColumnsType } from 'antd'
import type { IInstagramContent } from '../../types'

function InstagramTable() {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = useMemo(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10)
    return isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
  }, [searchParams])

  const { data, isPending } = useQuery({
    queryKey: ['instagram-contents', currentPage],
    queryFn: () => getInstagramContents({ page_size: 10, page: currentPage }),
  })

  const handlePaginationChange = (page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('page', page.toString())
      return newParams
    })
  }

  const columns: TableColumnsType<IInstagramContent> = [
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
      className: 'w-1/2',
      render: (_, record) => <InstagramTitle {...record} />,
    },
    {
      title: 'Описание',
      key: 'description',
      dataIndex: 'description',
      className: 'w-1/2',
      render: (_, record) => <InstagramDescription {...record} />,
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      width: 0,
      render: (_, record) => <InstagramStatus {...record} />,
    },
    {
      title: 'Действие',
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => <InstagramAction {...record} />,
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

export default InstagramTable
