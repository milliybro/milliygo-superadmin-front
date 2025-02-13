import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'

import type { ISevicesTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'
import MicrowaveIcon from '@/components/icons/microwave-icon'
import ServicesActionButton from '../components/services-action-button'
import UsersNotFound from '@/features/users/components/users-not-found'

const data: ISevicesTable[] = [
  {
    key: '1',
    id: 1,
    icon: <MicrowaveIcon />,
    name_uz: `Mikroto'lqinli pech`,
    name_ru: 'Микроволновка',
    name_en: 'Microwave oven',
    created_at: '13.12.2024',
    status: true,
  },
  {
    key: '2',
    id: 2,
    icon: <MicrowaveIcon />,
    name_uz: `Mikroto'lqinli pech`,
    name_ru: 'Микроволновка',
    name_en: 'Microwave oven',
    created_at: '13.12.2024',
    status: false,
  },
  {
    key: '3',
    id: 3,
    icon: <MicrowaveIcon />,
    name_uz: `Mikroto'lqinli pech`,
    name_ru: 'Микроволновка',
    name_en: 'Microwave oven',
    created_at: '13.12.2024',
    status: true,
  },
  {
    key: '4',
    id: 4,
    icon: <MicrowaveIcon />,
    name_uz: `Mikroto'lqinli pech`,
    name_ru: 'Микроволновка',
    name_en: 'Microwave oven',
    created_at: '13.12.2024',
    status: false,
  },
]

const onChange: TableProps<ISevicesTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const ServicesTable = () => {
  const { t } = useTranslation()

  const columns: TableColumnsType<ISevicesTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'fields.icon.label',
      dataIndex: 'icon',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'fields.name.name-uz',
      dataIndex: 'name_uz',
      sorter: {
        compare: (a, b) => a.name_uz.localeCompare(b.name_uz),
        multiple: 2,
      },
    },
    {
      title: 'fields.name.name-ru',
      dataIndex: 'name_ru',
      sorter: {
        compare: (a, b) => a.name_ru.localeCompare(b.name_ru),
        multiple: 1,
      },
    },
    {
      title: 'fields.name.name-en',
      dataIndex: 'name_en',
      sorter: {
        compare: (a, b) => a.name_en.localeCompare(b.name_en),
        multiple: 1,
      },
    },
    {
      title: 'fields.created-at.label',
      dataIndex: 'created_at',
      sorter: {
        compare: (a, b) => a.created_at.localeCompare(b.created_at),
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
      render: id => <ServicesActionButton id={id} />,
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

  return (
    <Table<ISevicesTable>
      columns={columns.map(val => ({
        ...val,
        title: t(`${val?.title}`),
      }))}
      dataSource={data}
      onChange={onChange}
      rootClassName="custom-table"
      className="w-full h-full"
      pagination={{
        pageSize: 10,
        total: 100,
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

export default ServicesTable
