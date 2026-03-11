import dayjs from 'dayjs'
import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'


import type { IActionHistory } from '../types'
import type { Dispatch, FC, SetStateAction } from 'react'
import type { PaginationProps, TableColumnsType } from 'antd'
<<<<<<< HEAD
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'
=======
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972

interface IProps {
  currentPage: number
  data: any
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const columns: TableColumnsType<IActionHistory> = [
  {
    width: 1000,
    title: 'common.service-name',
    dataIndex: 'service',
    render: value => `${value}`,
  },
  {
    width: 1000,
    title: 'common.action',
    dataIndex: 'data',
    render: (value, all) => `${all?.action}: ${value?.comment || ''}`,
  },
  {
    width: 1000,
    title: 'common.action-time',
    dataIndex: 'timestamp',
    render: value => dayjs(value).format('HH:mm, DD.MM.YYYY'),
  },
  {
    width: 1000,
    title: 'common.employee-id',
    dataIndex: 'user',
    render: value => `${value}`,
  },
]

const ActionHistoryTable: FC<IProps> = ({
  data,
  currentPage,
  setCurrentPage,
}) => {
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

  return (
    <Table
      columns={columns?.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      dataSource={data?.results}
      className="h-full w-full"
      rootClassName="custom-table"
      pagination={{
        current: currentPage,
        pageSize: 10,
        total: data?.count || 0,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],
        onChange: handlePaginationChange,
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

export default ActionHistoryTable
