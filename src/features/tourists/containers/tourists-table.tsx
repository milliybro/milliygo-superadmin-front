import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import type { ITourists, ITouristsTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import React from 'react'
import UsersNotFound from '../components/users-not-found'
import TouristActionButton from '../components/tourist-action-button'
import dayjs from 'dayjs'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { useTableChangeHandler } from '@/hooks/use-table-change-handler'

interface TouristsFiltersProps {
  currentPage: number
  isLoading: any
  TouristsData: any
  refetch: () => void
  showDrawer: () => void
}

const TouristsTable: React.FC<TouristsFiltersProps> = ({
  TouristsData,
  isLoading,
  currentPage,
  showDrawer,
}) => {
  const { t } = useTranslation()
  const isCompact = useCompactScreen()
  const handleTableChange = useTableChangeHandler<ITouristsTable>()

  const columns: TableColumnsType<ITouristsTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 39,
      responsive: ['sm', 'md', 'lg'],
      render: (_: any, __: any, index: number) =>
        ((Number(currentPage) || 1) - 1) * 10 + index + 1,
    },
    {
      title: 'tourists.tourist-fullname',
      dataIndex: 'full_name',
      sorter: true,
      width: 557,
      responsive: ['lg'],
      render: (_, record) => (
        <div className="flex items-center gap-2">{record?.full_name}</div>
      ),
    },
    {
      title: 'fields.birthdate.label',
      dataIndex: 'birth_date',
      sorter: true,
      width: isCompact ? 190 : 300,
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: date => date && <div>{dayjs(date).format('DD.MM.YYYY')}</div>,
    },
    {
      title: 'fields.passport-data.label',
      dataIndex: 'passport_sn',
      sorter: true,
      width: isCompact ? 230 : 300,
      responsive: ['sm', 'md', 'lg'],
    },
    {
      title: 'fields.gender.label',
      dataIndex: 'gender',
      sorter: true,
      width: 70,
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: data => (
        <div>
          {data === 'male' || data === 'man'
            ? t('common.men-small')
            : t('common.women-small')}
        </div>
      ),
    },
    {
      title: 'fields.register-address.label',
      dataIndex: 'address',
      sorter: true,
      width: 300,
      responsive: ['md', 'lg'],
    },
    {
      title: 'fields.type-document.label',
      dataIndex: 'type_document',
      sorter: true,
      width: isCompact ? 160 : 200,
      responsive: ['md', 'lg'],
      render: data => (
        <div title={data}>
          {typeof data === 'string' && data.length > 10
            ? `${data.slice(0, 10)}...`
            : data || '-'}
        </div>
      ),
    },
    {
      width: 30,
      title: isCompact ? '' : 'common.action',
      dataIndex: 'id',
      responsive: ['xs', 'sm', 'md'],
      render: id => <TouristActionButton id={id} showDrawer={showDrawer} />,
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
    TouristsData?.results.map((user: ITourists) => ({
      full_name: user.full_name,
      key: user.id.toString(),
      id: user.id,
      gender: user.gender,
      birth_date: user.birth_date,
      passport_sn: user.passport_sn,
      address: user.docgiveplace,
      type_document: user.document_type,
    })) || []

  return (
    <div className="overflow-x-auto">
      <Table<ITouristsTable>
        columns={columns.map(val => ({
          ...val,
          title: t(`${val?.title}`),
        }))}
        dataSource={transformedData}
        loading={isLoading}
        bordered
        onChange={handleTableChange}
        className="tourists-table w-full min-w-[700px] sm:min-w-[1000px]"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: TouristsData?.count || 0,
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
    </div>
  )
}

export default TouristsTable
