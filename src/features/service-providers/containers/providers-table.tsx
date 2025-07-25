import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import UserActionButton from '../components/user-action-button'

import type { IProviders, IProvidersTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import React from 'react'
import UsersNotFound from '../components/users-not-found'

interface UsersFiltersProps {
  hotelsData: any
  pageSize: number
  setCurrentPage: (value: number) => void
  currentPage: number
  isLoading: any
}
const staticHotelsData = {
  count: 2,
  results: [
    {
      id: 1,
      name: 'UZBEKISTAN Airways',
      image: '',
      status: true,
    },
    {
      id: 2,
      name: 'Istanbul Airways',
      image: '',
      status: false,
    },
  ],
}

const ProvidersTable: React.FC<UsersFiltersProps> = ({
  // hotelsData,
  isLoading,
  currentPage,
  setCurrentPage,
}) => {
  const { t } = useTranslation()

  const hotelsData = staticHotelsData

  const columns: TableColumnsType<IProvidersTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_text, _record, index) => index + 1,
      sorter: false,
      width: 50,
    },
    {
      title: 'common.name',
      dataIndex: 'name',
      sorter: true,
      render: (value, record: any) => {
        return (
          <div className="flex items-center gap-2">
            {record?.image ? (
              <img
                className="h-[48px] w-[48px] shrink-0 rounded-[8px] object-cover"
                src={record?.image}
                alt=""
              />
            ) : (
              <div className="flex size-[48px] items-center justify-center rounded-[8px] border border-border bg-secondary-light" />
            )}

            <div className="line-clamp-2 w-full">{value}</div>
          </div>
        )
      },
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: true,
      render: status => <StatusTag active={status} />,
    },
    {
      title: 'common.action',
      width: 200,
      dataIndex: 'id',
      render: id => <UserActionButton id={id} refetch={isLoading} />,
    },
  ]

  const itemRender: PaginationProps['itemRender'] = (
    n,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return (
        <span
          className={twMerge(
            'shrink-0 select-none rounded-[8px] border border-border px-[16px] py-[8px] font-medium text-secondary duration-200',
            n === 0 ? 'pointer-events-none opacity-0' : '',
          )}
        >
          {t('common.prev')}
        </span>
      )
    }
    if (type === 'next') {
      return (
        <span
          className={twMerge(
            'shrink-0 select-none rounded-[8px] border border-border px-[16px] py-[8px] font-medium text-secondary',
            n === 10 ? 'pointer-events-none opacity-0' : '',
          )}
        >
          {t('common.next')}
        </span>
      )
    }

    return originalElement
  }

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
  }

  const transformedData =
    hotelsData?.results.map((user: IProviders | any, i: number) => ({
      key: i,
      id: user.id,
      name: user.name,
      image: user.image,
      status: user.status,
    })) || []

  return (
    <div className="p-6 flex h-full flex-col items-center justify-center overflow-hidden">
      <Table<IProvidersTable>
        columns={columns.map(val => ({
          ...val,
          title: t(`${val?.title}`),
        }))}
        dataSource={transformedData}
        loading={isLoading}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="h-full w-full"
        bordered
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: hotelsData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],
          itemRender: itemRender,
          onChange: handlePaginationChange,
        }}
        locale={{
          emptyText: <UsersNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
      />
    </div>
  )
}

export default ProvidersTable
