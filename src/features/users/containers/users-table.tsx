import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import UserActionButton from '../components/user-action-button'

import type { IUsersTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'

const columns: TableColumnsType<IUsersTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 4,
    },
  },
  {
    title: 'fields.fullname.label',
    dataIndex: 'fullName',
    sorter: {
      compare: (a, b) => a.fullName.localeCompare(b.fullName),
      multiple: 3,
    },
  },
  {
    title: 'fields.phone.label',
    dataIndex: 'phone',
    sorter: {
      compare: (a, b) => a.phone.localeCompare(b.phone),
      multiple: 2,
    },
  },
  {
    title: 'fields.gender.label',
    dataIndex: 'gender',
    sorter: {
      compare: (a, b) => a.gender.localeCompare(b.gender),
      multiple: 1,
    },
  },
  {
    title: 'fields.login.label',
    dataIndex: 'login',
    sorter: {
      compare: (a, b) => a.login.localeCompare(b.login),
      multiple: 1,
    },
  },
  {
    title: 'fields.password.label',
    dataIndex: 'password',
    sorter: {
      compare: (a, b) => a.password.localeCompare(b.password),
      multiple: 1,
    },
  },
  {
    title: 'fields.role.label',
    dataIndex: 'role',
    sorter: {
      compare: (a, b) => a.role.localeCompare(b.role),
      multiple: 1,
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
    render: id => <UserActionButton id={id} />,
  },
]

const data: IUsersTable[] = [
  {
    key: '1',
    id: 101,
    fullName: 'John Brown',
    phone: '+1234567890',
    gender: 'Male',
    login: 'john_brown',
    password: 'password123',
    role: 'Admin',
    status: true,
  },
  {
    key: '2',
    id: 102,
    fullName: 'Jim Green',
    phone: '+0987654321',
    gender: 'Male',
    login: 'jim_green',
    password: 'password456',
    role: 'Editor',
    status: false,
  },
  {
    key: '3',
    id: 103,
    fullName: 'Joe Black',
    phone: '+1122334455',
    gender: 'Male',
    login: 'joe_black',
    password: 'password789',
    role: 'Viewer',
    status: true,
  },
  {
    key: '4',
    id: 104,
    fullName: 'Jim Red',
    phone: '+6677889900',
    gender: 'Male',
    login: 'jim_red',
    password: 'password000',
    role: 'Editor',
    status: false,
  },
]

const onChange: TableProps<IUsersTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const UsersTable = () => {
  const { t } = useTranslation()

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

  return (
    <Table<IUsersTable>
      columns={columns.map(val => ({
        ...val,
        title: t(`${val?.title}`),
      }))}
      dataSource={data}
      onChange={onChange}
      className="w-full h-full"
      pagination={{
        pageSize: 10,
        total: 100,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],

        itemRender: itemRender,
      }}
    />
  )
}

export default UsersTable
