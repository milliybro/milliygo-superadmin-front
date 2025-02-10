import { PaginationProps, Table, TableColumnsType, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { IHotelsRoom } from '../types'
import { formatAmount } from '@/helpers/format-amount'
import TickDoubleIcon from '@/components/icons/tick-double'
import StatusRoomTag from '../components/status-tag'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getHotelDetailRooms } from '../api'
import { useState } from 'react'

interface IHotelDetailRooms {
  id: number
  name: string
  price: number
  status: string
}

const onChange: TableProps<IHotelsRoom>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}
const HotelsItemRooms = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(1)

  const columns: TableColumnsType<IHotelsRoom> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'common.type-number',
      dataIndex: 'typeNumber',
      sorter: {
        compare: (a, b) => a.typeNumber.localeCompare(b.typeNumber),
        multiple: 3,
      },
      render: val => (
        <div className="flex items-center gap-[10px]">
          <div className="size-[48px] bg-secondary-light border-border border rounded-[8px]" />
          <span className="text-[14px] text-primary-dark font-medium">
            {val}
          </span>
        </div>
      ),
    },
    {
      title: 'common.price-night',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
      render: val => (
        <div>
          {val === 0 ? 0 : formatAmount(val)} {t('common.summ')}
        </div>
      ),
    },
    {
      title: 'common.convenience',
      dataIndex: 'convenience',
      sorter: {
        compare: (a, b) => a.typeNumber.localeCompare(b.typeNumber),
        multiple: 1,
      },
      render: () => (
        <div className="text-sm text-[#4DD282] flex flex-col gap-2">
          <span className="flex items-center gap-1">
            <TickDoubleIcon />
            {t('common.breakfast')}
          </span>
          <span className="flex items-center gap-1">
            <TickDoubleIcon />
            {t('common.free-cancel')}
          </span>
          <span className="flex items-center gap-1">
            <TickDoubleIcon />
            {t('common.no-add-pay')}
          </span>
        </div>
      ),
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status),
        multiple: 1,
      },
      render: record => (
        <StatusRoomTag status={record?.status || 'defaultStatus'} />
      ),
    },
  ]
  const { data: HotelDetailRoom } = useQuery({
    queryKey: ['hotels-detail-rooms', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getHotelDetailRooms(
        { page_size: 10, page: currentPage },
        Number(id),
      )
      return res
    },
    enabled: !!id,
  })

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

  const transformHotelDetailsToTableData = (
    data: IHotelDetailRooms[],
  ): IHotelsRoom[] => {
    return data.map((item, index: any) => {
      const { id } = item
      return {
        key: index,
        id: id,
        typeNumber: item?.name,
        name: item.name,
        price: item?.price || 0,
        status: item?.status || 'defaultStatus',
      }
    })
  }

  return (
    <div>
      <Table<IHotelsRoom>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        dataSource={
          HotelDetailRoom?.results
            ? transformHotelDetailsToTableData(HotelDetailRoom.results)
            : []
        }
        onChange={onChange}
        className="w-full h-full"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: HotelDetailRoom?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],

          itemRender: itemRender,
        }}
      />
    </div>
  )
}

export default HotelsItemRooms
