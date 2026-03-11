import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import UserActionButton from '../components/user-action-button'

import type { IUsers, IUsersTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
// import { useQuery } from '@tanstack/react-query'
// import { getUsersList } from '../api'
import React from 'react'
import UsersNotFound from '../components/users-not-found'
import { formatAmount } from '@/helpers/format-amount'

// const onChange: TableProps<IUsersTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
// }

interface UsersFiltersProps {
  hotelsData: any
  pageSize: number
  setCurrentPage: (value: number) => void
  currentPage: number
  isLoading: any
}

const AccommodationsTable: React.FC<UsersFiltersProps> = ({
  hotelsData,
  isLoading,
  currentPage,
  setCurrentPage,
  // pageSize,
}) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IUsersTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_text, _record, index) => index + 1,
      sorter: false,
    },
    {
      title: 'common.name',
      dataIndex: 'name',
      sorter: false,
      render: (value, record: any) => {
        return (
          <div className="flex items-center gap-2">
            {record?.image ? (
              <img
                className="h-[48px] w-[48px] shrink-0 rounded-[8px] object-cover"
                src={record?.image}
                alt=""
              />
            ) : null}

            <div className="line-clamp-2 w-full">{value}</div>
          </div>
        )
      },
    },
    {
      title: 'fields.address.label',
      dataIndex: 'address',
      sorter: false,
      width: 500,
      render: text => (
        <div className="line-clamp-1 w-[450px] text-[#3276FF] underline">
          {text}
        </div>
      ),
    },
    {
      title: 'fields.price.label',
      dataIndex: 'price',
      sorter: false,
      render: data => {
        return (
          <span className="whitespace-nowrap">
            {data ? formatAmount(data) + ' UZS' : '-'}
          </span>
        )
      },
    },
    {
      title: 'fields.rating.label',
      dataIndex: 'rating',
      sorter: false,
      render: data => {
        return (
          <div className="flex w-[38px] justify-center rounded-[8px] bg-[#FEF9C3] py-[6px]">
            {data}
          </div>
        )
      },
    },
    // {
    //   title: 'fields.password.label',
    //   dataIndex: 'password',
    //   sorter: {
    //     compare: (a, b) => a.password.localeCompare(b.password),
    //     multiple: 1,
    //   },
    // },
    {
      title: 'fields.contact-person.label',
      dataIndex: 'contact',
      // sorter: {
      //   compare: (a, b) => a.contact.localeCompare(b.contact),
      //   multiple: 1,
      // },
      render: data => {
        return <div className="text-center">{data ? data : '-'}</div>
      },
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: false,
      render: status => <StatusTag active={status} />,
    },
    {
      title: 'common.action',
      dataIndex: 'id',
      render: (id, record) => (
        <UserActionButton id={id} slug={record?.slug} refetch={isLoading} />
      ),
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
    hotelsData?.results?.map((user: IUsers, i: number) => ({
      key: i,
      id: user.id,
      name: user.name,
      image: user.image,
      address: user.address,
      price: user.price,
      rating: user.star_rating,
      contact: user.full_name,
      gender: user.gender,
      username: user.username,
      password: user.password,
      position: user.type?.name,
      status: user.status,
      slug: user.slug,
    })) || []

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white">
      <Table<IUsersTable>
        columns={columns?.map(val => ({
          ...val,
          title: t(`${val?.title}`),
        }))}
        dataSource={transformedData}
        loading={isLoading}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="h-full w-full"
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

export default AccommodationsTable
