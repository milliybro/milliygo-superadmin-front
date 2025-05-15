import {
  Image,
  PaginationProps,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { IHotelsRoom } from '../types'
import { formatAmount } from '@/helpers/format-amount'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router'
import { getHotelDetailRooms } from '../api'
import { useState } from 'react'
import UsersNotFound from '@/features/users/components/users-not-found'
import StatusRoomsTag from '../components/rooms-status-tag'
import FacilitiesCell from '../components/facilities-cell'
import BedSingleIcon from '@/components/icons/bed-icon'

// interface IHotelDetailRooms {
//   key: any
//   id: any
//   name: any
//   status: boolean
//   room_images: any
//   room_name: any
//   prices: any
//   facilities: any
// }

// name: item?.room_name,

const onChange: TableProps<IHotelsRoom>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {}
const HotelsItemRooms = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams] = useSearchParams()

  const tenant_id = searchParams.get('tenant_id')
  const type = searchParams.get('type')
  const lang = localStorage.getItem('i18nextLng')

  const { data: HotelDetailRoom } = useQuery({
    queryKey: ['hotels-detail-rooms', id, lang],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')
      const res = await getHotelDetailRooms({
        page_size: 10,
        page: currentPage,
        placement_id: id,
        ...(type === 'management' ? { tenant_id: tenant_id } : {}),
        type: type,
      })
      return res
    },
    enabled: !!id,
  })
  const columns: TableColumnsType<IHotelsRoom> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'common.type-number',
      dataIndex: 'room_name',
      sorter: {
        compare: (a, b) => a.room_name.localeCompare(b.room_name),
        multiple: 3,
      },
      render: (_, val: any) => (
        <div className="flex items-center gap-[10px]">
          {val?.room_images?.length > 0 ? (
            <Image
              width={48}
              height={48}
              className="rounded-[8px] object-cover"
              src={val?.room_images}
            />
          ) : (
            <span className="w-12 h-12 rounded-lg bg-slate-100 flex justify-center items-center">
              <BedSingleIcon />
            </span>
          )}

          <span className="text-[14px] text-primary-dark font-medium">{_}</span>
        </div>
      ),
    },
    {
      title: 'common.price-night',
      dataIndex: 'prices',
      sorter: {
        compare: (a, b) => a.prices - b.prices,
        multiple: 1,
      },
      render: val => (
        <div>
          {val.map((val: any, i: number) => (
            <div key={i} className="py-1 text-sm font-medium text-[#232E40]">
              {val === 0 ? 0 : formatAmount(val?.price)} {t('common.summ')}{' '}
              {val?.tarif !== '' ? `(${val?.tarif})` : ''}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'common.convenience',
      dataIndex: 'facilities',
      sorter: {
        compare: (a, b) => a.facilities.localeCompare(b.facilities),
        multiple: 1,
      },
      render: (val, record) => <FacilitiesCell val={val} rowKey={record.key} />,
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => Number(a.status) - Number(b.status),
        multiple: 1,
      },
      render: record => <StatusRoomsTag status={record || 'defaultStatus'} />,
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

  const transformHotelDetailsToTableData = (data: any): any => {
    return data.map((item: any, index: any) => {
      const { id } = item
      return {
        key: index,
        id: id,
        room_name: item?.room_name,
        room_images: item?.room_images[0]?.image,
        name: item?.room_name,
        prices: item?.prices || 0,
        status: item?.status === 'True',
        facilities: item?.facilities,
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
          HotelDetailRoom
            ? transformHotelDetailsToTableData(HotelDetailRoom)
            : []
        }
        onChange={onChange}
        className="w-full h-full"
        pagination={{
          current: currentPage,
          pageSize: 10,
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

export default HotelsItemRooms
