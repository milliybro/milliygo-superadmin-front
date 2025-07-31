import { useMemo } from 'react'
import { TableColumnsType } from 'antd'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import { getEvents } from '../../api'

import EventsDate from './events-date'
import EventsTitle from './events-title'
import EventsAction from './events-action'
import EventsStatus from './events-status'
import EventsAddress from './events-address'
import EventsOrganizer from './events-organizer'
import EventsDescription from './events-description'
import CustomTable from '@/components/ui/custom-table'

import type { IEvent } from '../../types'

function EventsTable() {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = useMemo(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10)
    return isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
  }, [searchParams])

  const { data, isPending } = useQuery({
    queryKey: ['events', currentPage],
    queryFn: () => getEvents({ page_size: 10, page: currentPage }),
  })

  const handlePaginationChange = (page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('page', page.toString())
      return newParams
    })
  }

  const columns: TableColumnsType<IEvent> = [
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
      width: 350,
      render: (_, record) => <EventsTitle {...record} />,
    },
    {
      title: 'Описание',
      key: 'description',
      dataIndex: 'description',
      width: 250,
      render: (_, record) => <EventsDescription {...record} />,
    },
    {
      title: 'Организатор',
      key: 'organizer',
      dataIndex: 'organizer',
      width: 180,
      render: (_, record) => <EventsOrganizer {...record} />,
    },
    {
      title: 'Дата',
      key: 'date',
      dataIndex: 'date',
      width: 150,
      render: (_, record) => <EventsDate {...record} />,
    },
    {
      title: 'Адрес',
      key: 'location',
      dataIndex: 'location',
      width: 200,
      render: (_, record) => <EventsAddress {...record} />,
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      width: 0,
      render: (_, record) => <EventsStatus {...record} />,
    },
    {
      title: 'Действие',
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => <EventsAction {...record} />,
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

export default EventsTable
