import { Table } from 'antd'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StarIcon from '@/components/icons/star'

import type { IHotelsItemTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'

const columns: TableColumnsType<IHotelsItemTable> = [
  {
    title: 'common.hotel',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
    width: 250,
    render: (_, record) => (
      <Link to={`/hotel/${record.id}`} className="underline text-primary">
        {record.name}
      </Link>
    ),
  },
  {
    width: 220,
    title: 'common.period',
    dataIndex: 'period',
    sorter: {
      compare: (a, b) => a.period.localeCompare(b.period),
      multiple: 2,
    },
  },
  {
    width: 220,
    title: 'fields.rating.label',
    dataIndex: 'rating',
    sorter: {
      compare: (a, b) => a.rating - b.rating,
      multiple: 2,
    },
    render: (_, record) => (
      <div className="flex items-center gap-1 text-[20px]">
        {Array.from({ length: record.rating }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
    ),
  },
  {
    title: 'common.comments',
    dataIndex: 'comments',
    sorter: {
      compare: (a, b) => a.comments.localeCompare(b.comments),
      multiple: 1,
    },
    width: 700,
    render: (_, record) => (
      <span className="text-sm text-gray-700">{record.comments}</span>
    ),
  },
]

const data: IHotelsItemTable[] = [
  {
    key: '1',
    id: 1,
    name: 'Oriente Palace Apartments',
    period: '2024-12-01 to 2024-12-05',
    comments:
      'Приезжали с семьей на неделю, и остались в восторге! Номера просторные, чистые, с красивым видом на город. Завтраки были разнообразные и вкусные — особенно понравилась выпечка. Персонал вежливый и всегда готов помочь. Расположение отеля удобное: рядом много кафе и магазинов. Обязательно вернемся снова!',
    rating: 5,
  },
  {
    key: '2',
    id: 2,
    name: 'Hilton Garden Inn',
    period: '2024-12-10 to 2024-12-15',
    comments:
      'Отличное место для отдыха и работы. Просторные номера с отличной шумоизоляцией. Вкусные завтраки и удобное расположение.',
    rating: 4,
  },
  {
    key: '3',
    id: 3,
    name: 'Hyatt Regency',
    period: '2024-12-20 to 2024-12-25',
    comments:
      'Элегантный отель с отличным сервисом. Особенно понравились удобства в номере и приветливый персонал.',
    rating: 5,
  },
  {
    key: '4',
    id: 4,
    name: 'Sheraton Tashkent',
    period: '2025-01-05 to 2025-01-10',
    comments:
      'Хороший отель, но завышенные цены. Понравилась чистота и расположение.',
    rating: 4,
  },
]

const onChange: TableProps<IHotelsItemTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const HotelsItemReviews = () => {
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
    <Table<IHotelsItemTable>
      columns={columns.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      dataSource={data}
      onChange={onChange}
      pagination={false}
      // pagination={{
      //   pageSize: 10,
      //   total: 100,
      //   hideOnSinglePage: true,
      //   showSizeChanger: false,
      //   position: ['bottomCenter'],

      //   itemRender: itemRender,
      // }}
    />
  )
}

export default HotelsItemReviews
