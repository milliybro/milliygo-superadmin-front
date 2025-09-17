import { Card, Table } from 'antd'
import { twMerge } from 'tailwind-merge'

import ArrowUpRightIcon from '@/components/icons/arrow-up-right'

import type { FC } from 'react'
import type { ColumnsType } from 'antd/es/table'

interface IProps {
  className?: string
}

interface BookingData {
  key: number
  guestName: string
  accommodationName: string
  guests: number
  stayPeriod: string
  bookingDate: string
  cancellationDate: string
  amount: string
  cancellationPercent: string
  reason: string
}

const columns: ColumnsType<BookingData> = [
  {
    title: '№',
    dataIndex: 'key',
    key: 'key',
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: 'Имя Гостя',
    dataIndex: 'guestName',
    key: 'guestName',
    sorter: (a, b) => a.guestName.localeCompare(b.guestName),
  },
  {
    title: 'Название средства размещения',
    dataIndex: 'accommodationName',
    key: 'accommodationName',
    sorter: (a, b) => a.accommodationName.localeCompare(b.accommodationName),
  },
  {
    title: 'Гостей',
    dataIndex: 'guests',
    key: 'guests',
    sorter: (a, b) => a.guests - b.guests,
  },
  {
    title: 'Заезд - Выезд',
    dataIndex: 'stayPeriod',
    key: 'stayPeriod',
    sorter: (a, b) =>
      new Date(a.stayPeriod.split(' - ')[0]).getTime() -
      new Date(b.stayPeriod.split(' - ')[0]).getTime(),
  },
  {
    title: 'Дата бронирования',
    dataIndex: 'bookingDate',
    key: 'bookingDate',
    sorter: (a, b) =>
      new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime(),
  },
  {
    title: 'Дата отмены',
    dataIndex: 'cancellationDate',
    key: 'cancellationDate',
    sorter: (a, b) =>
      new Date(a.cancellationDate).getTime() -
      new Date(b.cancellationDate).getTime(),
  },
  {
    title: 'Сумма',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) =>
      parseInt(a.amount.replace(/\s|UZS/g, '')) -
      parseInt(b.amount.replace(/\s|UZS/g, '')),
  },
  {
    title: 'Отмена в процентах',
    dataIndex: 'cancellationPercent',
    key: 'cancellationPercent',
    sorter: (a, b) =>
      parseInt(a.cancellationPercent) - parseInt(b.cancellationPercent),
  },
  {
    title: 'Причины',
    dataIndex: 'reason',
    key: 'reason',
    sorter: (a, b) => a.reason.localeCompare(b.reason),
  },
]

const data: BookingData[] = [
  {
    key: 1,
    guestName: 'Victor Chernov',
    accommodationName: 'Alisher Makhmudov',
    guests: 3,
    stayPeriod: '22 янв, 2024 - 29 янв, 2024',
    bookingDate: '9 янв, 2024',
    cancellationDate: '24 янв, 2024',
    amount: '14 560 000 UZS',
    cancellationPercent: '20%',
    reason: 'Неоплаченный',
  },
  {
    key: 2,
    guestName: 'Andrei Galkin',
    accommodationName: 'Victor Chernov',
    guests: 3,
    stayPeriod: '30 янв, 2024 - 7 фев, 2024',
    bookingDate: '9 янв, 2024',
    cancellationDate: '24 янв, 2024',
    amount: '18 729 000 UZS',
    cancellationPercent: '20%',
    reason: 'Неоплаченный',
  },
  {
    key: 3,
    guestName: 'Alexandra Penova',
    accommodationName: 'Andrei Galkin',
    guests: 3,
    stayPeriod: '25 янв, 2024 - 14 фев, 2024',
    bookingDate: '9 янв, 2024',
    cancellationDate: '24 янв, 2024',
    amount: '8 950 000 UZS',
    cancellationPercent: '20%',
    reason: 'Неоплаченный',
  },
]

const BookingCancelationsTable: FC<IProps> = props => {
  return (
    <Card classNames={{ body: '!p-0' }} className={twMerge(props.className)}>
      <div className="flex items-center border-b justify-between py-[18px] px-6">
        <div className="text-[18px] font-medium">
          Количество и причины отмены бронирования
        </div>
        <div className="flex items-center gap-1 text-primary font-medium">
          Посмотреть все <ArrowUpRightIcon className='font-[600]' />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="p-6 custom-table-2"
        rootClassName=""
      />
    </Card>
  )
}

export default BookingCancelationsTable
