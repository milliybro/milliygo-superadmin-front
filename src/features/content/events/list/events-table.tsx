import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { getEvents } from '../../api'
import { getTableSortOrder } from '@/helpers/get-table-sort-order'

import EventsDate from './events-date'
import EventsTitle from './events-title'
import EventsAction from './events-action'
import EventsStatus from './events-status'
import EventsAddress from './events-address'
import EventsOrganizer from './events-organizer'
import EventsDescription from './events-description'
import CustomTable from '@/components/ui/custom-table'

import type { IEvent } from '../../types'

import type { TableColumnsType, TablePaginationConfig } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

function EventsTable() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page') || '1')
  const orderingParam = searchParams.get('ordering') || ''
  const orderingFields = orderingParam.split(',').filter(Boolean)

  const { data, isPending } = useQuery({
    queryKey: ['events', currentPage, orderingParam],
    queryFn: () =>
      getEvents({
        page_size: 10,
        page: currentPage,
        ordering: orderingFields.join(',') || undefined,
      }),
  })

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<IEvent> | SorterResult<IEvent>[],
  ) => {
    const sorterArray = Array.isArray(sorter) ? sorter : [sorter]

    const newOrdering = sorterArray
      .filter(s => s.order && s.field) // field yo‘q bo‘lsa olib tashlaymiz
      .map(s => {
        const field = String(s.field)
        return s.order === 'ascend' ? field : `-${field}`
      })

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)

      // page
      const newPage = pagination.current ?? 1
      newParams.set('page', newPage.toString())

      // ordering
      if (newOrdering.length > 0) {
        newParams.set('ordering', newOrdering.join(','))
      } else {
        newParams.delete('ordering')
      }

      return newParams
    })
  }

  const columns: TableColumnsType<IEvent> = [
    {
      title: t('fields.name.label'),
      key: 'name',
      dataIndex: 'name',
      width: 350,
      render: (_, record) => <EventsTitle {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'title'),
    },
    {
      title: t('fields.description.label'),
      key: 'description',
      dataIndex: 'description',
      width: 250,
      render: (_, record) => <EventsDescription {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'description'),
    },
    {
      title: t('fields.organizer.label'),
      key: 'organizer',
      dataIndex: 'organizer',
      width: 180,
      render: (_, record) => <EventsOrganizer {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'organizer'),
    },
    {
      title: t('fields.date.label'),
      key: 'date',
      dataIndex: 'date',
      width: 150,
      render: (_, record) => <EventsDate {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'date'),
    },
    {
      title: t('fields.address.label'),
      key: 'location',
      dataIndex: 'location',
      width: 200,
      render: (_, record) => <EventsAddress {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'location'),
    },
    {
      title: t('fields.status.label'),
      key: 'status',
      width: 0,
      render: (_, record) => <EventsStatus {...record} />,
      sorter: true,
      sortOrder: getTableSortOrder(orderingFields, 'status'),
    },
    {
      title: t('common.action'),
      key: 'action',
      width: 0,
      render: (_, record) => <EventsAction {...record} />,
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

export default EventsTable
