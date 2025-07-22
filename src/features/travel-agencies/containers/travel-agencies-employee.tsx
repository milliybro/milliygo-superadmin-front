import { Image, PaginationProps, Table, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import BedSingleIcon from '@/components/icons/bed-icon'
import UsersNotFound from '@/features/users/components/users-not-found'
import { useState } from 'react'

import { ITourAgents } from '../types'

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

const staticHotelsData = {
  count: 2,
  results: [
    {
      id: 1,
      employee_name: 'Azizbek Khamidov',
      brief_info: 'Некоторая информация о сотрудниках',
    },
    {
      id: 2,
      employee_name: 'Azizbek Khamidov',
      brief_info: 'Некоторая информация о сотрудниках',
    },
  ],
}
const TravelAgenciesEmployees = () => {
  const { t } = useTranslation()
  // const { id } = useParams<{ id: string }>()
  const [currentPage, _] = useState(1)
  // const [searchParams] = useSearchParams()

  const pageSize = 10

  // const tenant_id = searchParams.get('tenant_id')
  // const type = searchParams.get('type')
  // const lang = localStorage.getItem('i18nextLng')

  // const { data: HotelDetailRoom } = useQuery({
  //   queryKey: ['hotels-detail-rooms', id, lang],
  //   queryFn: async () => {
  //     if (!id) throw new Error('ID is required')
  //     const res = await getHotelDetailRooms({
  //       page_size: 10,
  //       page: currentPage,
  //       placement_id: id,
  //       ...(type === 'management' ? { tenant_id: tenant_id } : {}),
  //       type: type,
  //     })
  //     return res
  //   },
  //   enabled: !!id,
  // })

  const columns: TableColumnsType<ITourAgents> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      sorter: false,
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'travel-agencies.fullname-employee',
      dataIndex: 'employee_name',
      sorter: false,
      render: (_, val: any) => (
        <div className="flex items-center gap-[10px]">
          {val ? (
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
      title: 'travel-agencies.brief-employee',
      dataIndex: 'brief_info',
      sorter: false,
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
        brief_info: item.brief_info,
        employee_name: item.employee_name,
      }
    })
  }

  return (
    <div>
      <Table<ITourAgents>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        dataSource={
          staticHotelsData?.results
            ? transformHotelDetailsToTableData(staticHotelsData?.results)
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

export default TravelAgenciesEmployees
