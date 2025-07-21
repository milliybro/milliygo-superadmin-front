import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import type { ITourists, ITouristsTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import React from 'react'
import UsersNotFound from '../components/users-not-found'
import TouristActionButton from '../components/tourist-action-button'
import dayjs from 'dayjs'

interface TouristsFiltersProps {
  setCurrentPage: (value: number) => void
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
  setCurrentPage,
  showDrawer,
}) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<ITouristsTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_: any, __: any, index: number) =>
        ((Number(currentPage) || 1) - 1) * 10 + index + 1,
      sorter: false,
    },
    {
      title: 'fields.fullname.label',
      dataIndex: 'full_name',
      sorter: false,
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">{record?.full_name}</div>
        )
      },
    },
    {
      title: 'fields.birthdate.label',
      dataIndex: 'birth_date',
      sorter: false,
      render: date => {
        return <div>{date && dayjs(date).format('DD MMM, YYYY')}</div>
      },
    },
    {
      title: 'fields.passport-data.label',
      dataIndex: 'passport_number',
      sorter: false,
    },
    {
      title: 'fields.gender.label',
      dataIndex: 'gender',
      sorter: false,
      render: data => {
        console.log(data, 'dddd')

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
      title: 'fields.register-address.label',
      dataIndex: 'address',
      sorter: false,
    },
    {
      title: 'fields.type-document.label',
      dataIndex: 'type_document',
      sorter: false,
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
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
    TouristsData?.results.map((user: ITourists) => ({
      full_name: user.full_name,
      key: user.id.toString(),
      id: user.id,
      gender: user.gender,
      birth_date: user.birth_date,
      passport_number: user.passport_number,
      type_name: user.type_document,
      address: user.docgiveplace,
      type_document: user.document_type,
      status: user.status,
    })) || []

  return (
    <Table<ITouristsTable>
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
        total: TouristsData?.count || 0,
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

export default TouristsTable
