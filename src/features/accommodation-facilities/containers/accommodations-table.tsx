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

// const onChange: TableProps<IUsersTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
//   console.log('params', pagination, filters, sorter, extra)
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
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'common.name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
      render: (_, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <img
              className="w-[48px] h-[48px] object-cover rounded-[8px]"
              src={record?.image}
              alt=""
            />
            {_}
          </div>
        )
      },
    },
    {
      title: 'fields.address.label',
      dataIndex: 'address',
      sorter: {
        compare: (a, b) => a.address.localeCompare(b.address),
        multiple: 2,
      },
      render: text => <a className="text-[#3276FF] underline">{text}</a>,
    },
    {
      title: 'fields.price.label',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
      render: data => {
        return <div>{data}</div>
      },
    },
    {
      title: 'fields.rating.label',
      dataIndex: 'rating',
      sorter: {
        compare: (a, b) => a.rating - b.rating,
        multiple: 1,
      },
      render: data => {
        return (
          <div className="bg-[#FEF9C3] flex justify-center py-[6px] rounded-[8px] w-[38px]">
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
      sorter: {
        compare: (a, b) => a.contact.localeCompare(b.contact),
        multiple: 1,
      },
      render: data => {
        return <div>{data}</div>
      },
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => Number(a.status) - Number(b.status),
        multiple: 1,
      },
      render: status => <StatusTag active={status} />,
    },
    {
      width: 300,
      title: 'common.action',
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
            'px-[16px] select-none duration-200 py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
            n === 0 ? 'opacity-0 pointer-events-none' : '',
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
            'px-[16px] select-none py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
            n === 10 ? 'opacity-0 pointer-events-none' : '',
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
    hotelsData?.results.map((user: IUsers) => ({
      key: user.id.toString(),
      id: user.id,
      name: user.placement_name,
      image: user.image,
      address: user.placement_address,
      price: user.price,
      rating: user.star_rating,
      contact: user.full_name,
      gender: user.gender,
      username: user.username,
      password: user.password,
      position: user.type?.name,
      status: user.is_active,
    })) || []

  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IUsersTable>
        columns={columns.map(val => ({
          ...val,
          title: t(`${val?.title}`),
        }))}
        dataSource={transformedData}
        loading={isLoading}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="w-full h-full"
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
