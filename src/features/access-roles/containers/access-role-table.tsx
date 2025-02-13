import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import RoleActionButton from '../components/role-action-button'

import type { IAccessRoleTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'
import UsersNotFound from '@/features/users/components/users-not-found'

const columns: TableColumnsType<IAccessRoleTable> = [
  {
    width: 1000,
    title: 'fields.role-name.label',
    dataIndex: 'roleName',
    sorter: {
      compare: (a, b) => a.roleName.localeCompare(b.roleName),
      multiple: 2,
    },
  },
  {
    width: 1000,
    title: 'fields.status.label',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => Number(a.status) - Number(b.status),
      multiple: 1,
    },
    render: status => <StatusTag active={status} colorless />,
  },
  {
    title: 'common.action',
    dataIndex: 'id',
    render: id => <RoleActionButton id={id} />,
  },
]

const data: IAccessRoleTable[] = [
  {
    key: '1',
    id: '1',
    roleName: 'Admin',
    status: true,
  },
  {
    key: '2',
    id: '2',
    roleName: 'Editor',
    status: false,
  },
  {
    key: '3',
    id: '3',
    roleName: 'Viewer',
    status: true,
  },
  {
    key: '4',
    id: '4',
    roleName: 'Contributor',
    status: false,
  },
]

const onChange: TableProps<IAccessRoleTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const AccessRoleTable = () => {
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
    <Table<IAccessRoleTable>
      columns={columns?.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      dataSource={data}
      onChange={onChange}
      className="w-full h-full"
      rootClassName="custom-table"
      pagination={{
        pageSize: 10,
        total: 100,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],

        itemRender: itemRender,
      }}
      locale={{
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
        emptyText: <UsersNotFound />,
      }}
    />
  )
}

export default AccessRoleTable
