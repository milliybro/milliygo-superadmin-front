import { Button, Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { IHotelsTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'

import formatDate from '@/features/clients/components/format-date'
import UsersNotFound from '@/features/users/components/users-not-found'

const onChange: TableProps<IHotelsTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const TenantsTable = ({
  tenantsData,
  currentPage,
  setCurrentPage,
  isLoading,
  pageSize,
}: any) => {
  const { t } = useTranslation()
  const columns: TableColumnsType<IHotelsTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 4,
      },
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'tenant.tenant-name',
      dataIndex: 'schema_name',
      sorter: {
        compare: (a, b) => a.schema_name.localeCompare(b.schema_name),
        multiple: 3,
      },
      render: _ => (
        <div className="flex items-center gap-[10px]">
          <span className="text-[14px] text-primary-dark font-medium">{_}</span>
        </div>
      ),
    },
    {
      title: 'fields.login.label',
      dataIndex: 'username',
      sorter: {
        compare: (a, b) => a.username.localeCompare(b.username),
        multiple: 1,
      },
      render: _ => (
        <div className="flex items-center gap-[10px]">{_ ? _ : '-'}</div>
      ),
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
      title: 'tenant.start-date',
      dataIndex: 'start_date',
      sorter: {
        compare: (a, b) => a.start_date.localeCompare(b.start_date),
        multiple: 1,
      },
      render: _ => (
        <div className="flex items-center gap-[10px]">
          {_ ? formatDate(_) : '-'}
        </div>
      ),
    },
    {
      title: 'tenant.end-date',
      dataIndex: 'end_date',
      sorter: {
        compare: (a, b) => a.end_date.localeCompare(b.end_date),
        multiple: 1,
      },
      render: _ => (
        <div className="flex items-center gap-[10px]">
          {_ ? formatDate(_) : '-'}
        </div>
      ),
    },
    {
      title: 'tenant.domen',
      dataIndex: 'domain',
      sorter: {
        compare: (a, b) => a.domain.localeCompare(b.domain),
        multiple: 1,
      },
      render: _ => (
        <Button
          type="link"
          href={`http://${_}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[10px] cursor-pointer"
        >
          {_ ? _ : '-'}
        </Button>
      ),
    },
    {
      title: 'fields.status.label',
      dataIndex: 'is_active',
      sorter: {
        compare: (a, b) => a.is_active.localeCompare(b.is_active),
        multiple: 1,
      },
      render: status => <StatusTag active={status} />,
    },
    {
      width: 1,
      title: 'common.action',
      dataIndex: 'id',
      render: val => <HotelsTableActionButton id={val} />,
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

  const transformedTenantsData =
    tenantsData?.results.map((item: IHotelsTable) => ({
      key: item.id,
      id: item.id,
      schema_name: item.schema_name,
      username: item.username,
      is_active: item.is_active,
      password: item.password,
      domain: item.domain,
      start_date: item.start_date,
      end_date: item.end_date,
    })) || []

  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IHotelsTable>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedTenantsData}
        onChange={onChange}
        className="w-full h-full"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: tenantsData?.count || 0,
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

export default TenantsTable
