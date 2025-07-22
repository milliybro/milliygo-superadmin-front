import { Image, PaginationProps, Table, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import BedSingleIcon from '@/components/icons/bed-icon'
import UsersNotFound from '@/features/users/components/users-not-found'
import { formatAmount } from '@/helpers/format-amount'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { getHotelDetailRooms } from '../api'
import FacilitiesCell from '../components/facilities-cell'
import StatusRoomsTag from '../components/rooms-status-tag'
import { IHotelsRoom } from '../types'

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

const PlacementsItemRooms = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [currentPage, _] = useState(1)
  const [searchParams] = useSearchParams()

  const pageSize = 10

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
      sorter: false,
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'common.type-number',
      dataIndex: 'room_name',
      sorter: false,
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
      sorter: false,
      render: val => (
        <div>
          {val.map((val: any, i: number) => (
            <div key={i} className="py-1 text-sm font-medium text-[#232E40]">
              {val === 0 ? 0 : formatAmount(val?.price)} {t('common.sum')}{' '}
              {val?.tarif !== '' ? `(${val?.tarif})` : ''}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'common.convenience',
      dataIndex: 'facilities',
      sorter: false,
      render: (val, record) => <FacilitiesCell val={val} rowKey={record.key} />,
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: false,
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

export default PlacementsItemRooms
