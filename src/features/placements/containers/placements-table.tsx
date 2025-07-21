import { Image, Table, Tooltip } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { IHotelsTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import HotelIcon from '@/components/icons/hotel'
import UsersNotFound from '@/features/users/components/users-not-found'

const staticHotelsData = {
  count: 2,
  results: [
    {
      id: 1,
      placement_name: 'Hotel Grand Palace',
      image: '',
      placement_address: 'Tashkent, Amir Temur street 100',
      location: 'Tashkent, Amir Temur street 100',
      price: 120,
      rating: 4,
      status: true,
      address: 'Tashkent',
      min_price: 90,
      star_rating: 4,
      username: 'grand_palace_admin',
      password: 'password123',
      full_name: 'Ali Valiyev',
      tenant_id: 'tenant-1',
      type: 'hotel',
      phone_number: '+998901234567',
    },
    {
      id: 2,
      placement_name: 'Silk Road Inn',
      image: '',
      placement_address: 'Samarkand, Navoi street 20',
      location: 'Samarkand, Navoi street 20',
      price: 80,
      rating: 3,
      status: false,
      address: 'Samarkand',
      min_price: 60,
      star_rating: 3,
      username: 'silkroad_admin',
      password: 'securepass',
      full_name: 'Dilnoza Karimova',
      tenant_id: 'tenant-2',
      type: 'hotel',
      phone_number: '+998901234568',
    },
  ],
}

const PlacementsTable = ({
  // hotelsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()
  const hotelsData = staticHotelsData
  const columns: TableColumnsType<IHotelsTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: 'fields.hotel-name.label',
      dataIndex: 'placement_name',
      sorter: false,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <div className="size-[48px] flex justify-center items-center bg-secondary-light border-border border rounded-[8px]">
            {val?.image ? (
              <Image
                src={val?.image}
                alt={val?.placement_name}
                width={48}
                height={48}
                className="rounded-[8px] object-cover"
              />
            ) : (
              <HotelIcon fontSize={28} />
            )}
          </div>
          <span className="text-[14px] text-primary-dark font-medium">
            {val?.placement_name ? val?.placement_name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'fields.address.label',
      width: 200,
      dataIndex: 'placement_address',
      sorter: false,
    },
    {
      title: 'fields.location.label',
      width: 200,
      dataIndex: 'location',
      sorter: false,
      render: val => (
        <div>
          {val ? (
            <Tooltip
              color="white"
              overlayInnerStyle={{
                color: '#3276FF',
                textAlign: 'center',
                textDecoration: 'underline',
              }}
              title={val}
              key={val}
            >
              <a
                style={{ textDecoration: 'underline' }}
                className="text-[#3276FF] line-clamp-2"
              >
                {val}
              </a>
            </Tooltip>
          ) : (
            <div className="text-center">-</div>
          )}
        </div>
      ),
    },
    // {
    //   title: 'fields.price.label',
    //   dataIndex: 'price',
    //   sorter: {
    //     compare: (a, b) => a.price - b.price,
    //     multiple: 1,
    //   },
    //   render: val => (
    //     <div>
    //       {val ? formatAmount(val) : '0'} {t('common.sum')}
    //     </div>
    //   ),
    // },
    {
      title: 'fields.rating.label',
      dataIndex: 'rating',
      sorter: false,
      render: val => <RatingTag value={val} />,
    },
    {
      title: 'fields.login.label',
      dataIndex: 'phone_number',
      sorter: false,
      render: _ => (
        <div className="flex items-center text-center gap-[10px]">
          {_ ? _ : <div className="text-center">-</div>}
        </div>
      ),
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: false,
      render: status => <StatusTag active={status} />,
    },
    {
      width: 1,
      title: 'common.action',
      render: (id, val: any) => (
        <HotelsTableActionButton
          key={id}
          id={val.id}
          tenant_id={val.tenant ?? undefined}
          type={val?.type}
        />
      ),
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

  const transformedHotelsData = hotelsData?.results.map(
    (item: IHotelsTable | any, i: any) => ({
      key: i,
      id: item.id,
      placement_name: item.placement_name,
      image: item.image,
      placement_address: item.placement_address,
      price: item.price,
      rating: item.star_rating,
      status: item.status,
      address: item.address,
      min_price: item.min_price,
      star_rating: item.star_rating,
      login: item.username,
      password: item.password,
      full_name: item.full_name,
      balance: item.balance,
      tenant: item.tenant_id,
      type: item.type,
      location: item.location,
      phone_number: item.phone_number,
    }),
  )

  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IHotelsTable>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedHotelsData}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="w-full h-full"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: hotelsData?.count || 0,
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
    </div>
  )
}

export default PlacementsTable
