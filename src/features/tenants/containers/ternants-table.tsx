import { Button, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { PaginationProps, TableColumnsType } from 'antd'
import type { IHotelsTable } from '../types'

import formatDate from '@/features/clients/components/format-date'
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'

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
      sorter: false,
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'tenant.tenant-name',
      dataIndex: 'schema_name',
      sorter: false,
      render: _ => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">{_}</span>
        </div>
      ),
    },
    {
      title: 'fields.login.label',
      dataIndex: 'username',
      sorter: false,
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
      sorter: false,
      render: _ => (
        <div className="flex items-center gap-[10px]">
          {_ ? formatDate(_) : '-'}
        </div>
      ),
    },
    {
      title: 'tenant.end-date',
      dataIndex: 'end_date',
      sorter: false,
      render: _ => (
        <div className="flex items-center gap-[10px]">
          {_ ? formatDate(_) : '-'}
        </div>
      ),
    },
    {
      title: 'tenant.domen',
      dataIndex: 'domain',
      sorter: false,
      render: _ => (
        <Button
          type="link"
          href={`http://${_}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-[10px]"
        >
          {_ ? _ : '-'}
        </Button>
      ),
    },
    {
      title: 'fields.status.label',
      dataIndex: 'is_active',
      sorter: false,
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
    <div className="flex h-full flex-col items-center justify-center overflow-x-auto rounded-[16px] border border-border bg-white">
      <Table<IHotelsTable>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedTenantsData}
        className="h-full w-full"
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
