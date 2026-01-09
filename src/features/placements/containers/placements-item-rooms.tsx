import { Image, PaginationProps, Table, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import BedSingleIcon from '@/components/icons/bed-icon'
import UsersNotFound from '@/features/users/components/users-not-found'
import { formatAmount } from '@/helpers/format-amount'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { getPlacementDetailRooms } from '../api'
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
    queryKey: ['hotels-detail-rooms', id, lang, currentPage],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')

      return getPlacementDetailRooms(id, {
        page_size: pageSize,
        page: currentPage,
        ...(type === 'management' ? { tenant_id } : {}),
        type,
      })
    },
    enabled: !!id,
  })

  // const dataStructure = {
  //   count: 1,
  //   next: null,
  //   previous: null,
  //   results: [
  //     {
  //       name: '103',
  //       room_name: 'Standart Single',
  //       _schema: 'itmucj0343',
  //       tariffs:
  //         '[{"price": 400000.000, "room_tarif_name": "Стандартный одноместный номер"}]',
  //       images: [
  //         'https://file.sayohat.uz/buckets/itmucj0343/management-bucket/files/82c90ae82efd4b2eb147ef98c92aed39.webp',
  //         'https://file.sayohat.uz/buckets/itmucj0343/management-bucket/files/c138317d0a33449688b844612b2a2627.webp',
  //         'https://file.sayohat.uz/buckets/itmucj0343/management-bucket/files/55c07b650b8a43b0919661fa0ea16090.webp',
  //       ],
  //     },
  //   ],
  // }

  const columns: TableColumnsType<IHotelsRoom> = [
    {
      title: '№',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      className: 'text-center',
    },
    {
      title: 'placements.room-number',
      dataIndex: 'name',
      render: val => (
        <span className="text-sm font-medium text-primary-dark">№{val}</span>
      ),
    },
    {
      title: 'common.type-number',
      dataIndex: 'room_name',
      render: (_, record: any) => (
        <div className="flex items-center gap-[10px]">
          {record?.images?.length > 0 ? (
            <Image
              width={48}
              height={48}
              className="rounded-[8px] object-cover"
              src={record.images[0]}
            />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
              <BedSingleIcon />
            </span>
          )}
          <span className="text-sm font-medium text-primary-dark">
            {record.room_name}
          </span>
        </div>
      ),
    },
    {
      title: 'placements.tariff-name',
      dataIndex: 'tariff_name',
    },
    {
      title: 'common.price-night',
      dataIndex: 'price',
      render: val => `${formatAmount(val)} UZS`,
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

  const transformHotelDetailsToTableData = (data: any) => {
    return data?.results?.map((item: any, index: number) => {
      const parsedTariff = item?.tariffs ? JSON.parse(item.tariffs)[0] : null

      return {
        key: index,
        id: index + 1,
        name: item?.name,
        room_name: item?.room_name,
        images: item?.images || [],
        tariff_name: parsedTariff?.room_tarif_name ?? '-',
        price: parsedTariff?.price ?? 0,
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
        className="h-full w-full"
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
