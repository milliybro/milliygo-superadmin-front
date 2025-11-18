import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import StatusTag from '@/components/ui/status-tag'
import UserActionButton from '../components/user-action-button'

import type {
  PaginationProps,
  TableColumnsType,
  TablePaginationConfig,
} from 'antd'
import type { IUsers, IUsersTable } from '../types'
// import { useQuery } from '@tanstack/react-query'
// import { getUsersList } from '../api'
import { truthyObject } from '@/helpers/truthy-object'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { SorterResult } from 'antd/es/table/interface'
import queryString from 'query-string'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import UsersNotFound from '../components/users-not-found'

// const onChange: TableProps<IUsersTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
// }

interface UsersFiltersProps {
  isLoading: any
  UsersData: any
  refetch: () => void
}

const UsersTable: React.FC<UsersFiltersProps> = ({
  UsersData,
  isLoading,
  refetch,
}) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const queries = useParsedQuery()
  const navigate = useNavigate()

  const columns: TableColumnsType<IUsersTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_text, _record, index) =>
        index + 1 + (queries.page ? +queries.page - 1 : 0) * 10,
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
      dataIndex: 'type',
      sorter: false,
      render: data => {
        return <div>{data}</div>
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

  const transformedData =
    UsersData?.results.map((user: IUsers) => ({
      full_name: user.full_name,
      type: user.type?.display_name,
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort.field
      : null

    const newPage = pagination.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        page: newPage,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <Table<IUsersTable>
      columns={columns.map(val => ({
        ...val,
        title: t(`${val?.title}`),
      }))}
      dataSource={transformedData}
      loading={isLoading}
      onChange={handleTableChange}
      className="h-full w-full"
      pagination={{
        current: queries.page ? Number(queries.page) : 1,
        pageSize: 10,
        total: UsersData?.count || 0,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],
        itemRender: itemRender,
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
