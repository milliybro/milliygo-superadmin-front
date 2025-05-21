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
// }

interface UsersFiltersProps {
  setCurrentPage: (value: number) => void
  currentPage: number
  isLoading: any
  UsersData: any
  refetch: () => void
}

const UsersTable: React.FC<UsersFiltersProps> = ({
  UsersData,
  isLoading,
  currentPage,
  setCurrentPage,
  refetch,
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
      title: 'fields.fullname.label',
      dataIndex: ['first_name', 'last_name', 'middle_name'],
      sorter: false,
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">{record?.full_name}</div>
        )
      },
    },
    {
      title: 'fields.phone.label',
      dataIndex: 'phone',
      sorter: false,
    },
    {
      title: 'fields.gender.label',
      dataIndex: 'gender',
      sorter: false,
      render: data => {
        return (
          <div>
            {data === 'male'
              ? t('common.men-small')
              : data === 'man'
                ? t('common.men-small')
                : t('common.women-small')}
          </div>
        )
      },
    },
    {
      title: 'fields.login.label',
      dataIndex: 'username',
      sorter: false,
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
      title: 'fields.role.label',
      dataIndex: 'type_name',
      sorter: false,
      render: data => {
        return (
          <div>
            {data === 'support'
              ? t('common.support')
              : data === 'complaint'
                ? t('common.complaint')
                : t('common.manager')}
          </div>
        )
      },
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: false,
      render: status => <StatusTag active={status} />,
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      render: id => <UserActionButton id={id} refetch={refetch} />,
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
    UsersData?.results.map((user: IUsers) => ({
      full_name: user.full_name,
      type_name: user.type_name,
      key: user.id.toString(),
      id: user.id,
      fullName:
        `${user.first_name} ${user.middle_name || ''} ${user.last_name}`.trim(),
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name || '',
      phone: user.phone,
      gender: user.gender,
      username: user.username,
      password: user.password,
      position: user.type?.name,
      status: user.is_active,
    })) || []

  return (
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
        total: UsersData?.count || 0,
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
  )
}

export default UsersTable
