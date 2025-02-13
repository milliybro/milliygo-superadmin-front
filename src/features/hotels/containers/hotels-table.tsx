import { Image, Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { IHotelsTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import { formatAmount } from '@/helpers/format-amount'
import HotelIcon from '@/components/icons/hotel'
import UsersNotFound from '@/features/users/components/users-not-found'

// const onChange: TableProps<IHotelsTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
//   console.log('params', pagination, filters, sorter, extra)
// }

const HotelsTable = ({
  hotelsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IHotelsTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'fields.hotel-name.label',
      dataIndex: 'placement_name',
      sorter: {
        compare: (a, b) => a.placement_name.localeCompare(b.placement_name),
        multiple: 3,
      },
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <div className="size-[48px] flex justify-center items-center bg-secondary-light border-border border rounded-[8px]">
            {val?.image ? (
              <Image
                src={val?.image}
                alt={val?.placement_name}
                width={48}
                height={48}
                className="rounded-[8px]"
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
      title: 'fields.location.label',
      width: 200,
      dataIndex: 'placement_address',
      sorter: {
        compare: (a, b) =>
          a.placement_address.localeCompare(b.placement_address),
        multiple: 2,
      },
      render: val => (
        <div>
          {val ? (
            <a
              style={{ textDecoration: 'underline' }}
              className="text-[#3276FF]"
            >
              {val}
            </a>
          ) : (
            <div className="text-center">-</div>
          )}
        </div>
      ),
    },
    {
      title: 'fields.price.label',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
      render: val => (
        <div>
          {val ? formatAmount(val) : '0'} {t('common.summ')}
        </div>
      ),
    },
    {
      title: 'fields.rating.label',
      dataIndex: 'rating',
      sorter: {
        compare: (a, b) => a.rating - b.rating,
        multiple: 1,
      },
      render: val => <RatingTag value={val} />,
    },
    {
      title: 'fields.login.label',
      dataIndex: 'login',
      sorter: {
        compare: (a, b) => a.login.localeCompare(b.login),
        multiple: 1,
      },
      render: _ => (
        <div className="flex items-center text-center gap-[10px]">
          {_ ? _ : <div className="text-center">-</div>}
        </div>
      ),
    },
    // {
    //   title: 'fields.password.label',
    //   dataIndex: 'password',
    //   sorter: {
    //     compare: (a, b) => a.password.localeCompare(b.password),
    //     multiple: 1,
    //   },
    // },
    {
      title: 'fields.contact-person.label',
      dataIndex: 'full_name',
      sorter: {
        compare: (a, b) => a.full_name.localeCompare(b.full_name),
        multiple: 1,
      },
      render: val => <div>{val === ' ' ? '-' : val}</div>,
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status),
        multiple: 1,
      },
      render: status => <StatusTag active={status} />,
    },
    {
      title: 'fields.balance.label',
      dataIndex: 'balance',
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status),
        multiple: 1,
      },
      render: val => <div>{val ? val : '0'}</div>,
    },
    {
      width: 1,
      title: 'common.action',
      // dataIndex: 'id',
      render: (id, val) => (
        <HotelsTableActionButton
          key={id}
          id={val.id}
          tenant_id={val.key ?? undefined}
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
    (item: IHotelsTable | any, i:any) => ({
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
      tenant: item.tenant_id
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
        locale={{ emptyText: <UsersNotFound /> }}
      />
    </div>
  )
}

export default HotelsTable
