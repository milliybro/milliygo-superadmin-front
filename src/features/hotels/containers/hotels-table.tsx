import { Image, Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import RatingTag from '@/components/ui/rating-tag'
import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { IHotelsTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'
import { getHotelsList } from '../api'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { formatAmount } from '@/helpers/format-amount'


const onChange: TableProps<IHotelsTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const HotelsTable = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const columns: TableColumnsType<IHotelsTable> = [
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
      title: 'fields.hotel-name.label',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <div className="size-[48px] bg-secondary-light border-border border rounded-[8px]">
            <Image src={val?.image} alt={val?.name} width={48} height={48} />
          </div>
          <span className="text-[14px] text-primary-dark font-medium">
            {val?.name}
          </span>
        </div>
      ),
    },
    {
      title: 'fields.location.label',
      width: 200,
      dataIndex: 'location',
      sorter: {
        compare: (a, b) => a.location.localeCompare(b.location),
        multiple: 2,
      },
      render: val => (
        <div>
          <a style={{ textDecoration: 'underline' }} className="text-[#3276FF]">
            {val}
          </a>
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
      render: val => <div>{formatAmount(val)} {t('common.summ')}</div>,
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
      dataIndex: 'contactPerson',
      sorter: {
        compare: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
        multiple: 1,
      },
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
    },
    {
      width: 1,
      title: 'common.action',
      dataIndex: 'id',
      render: val => <HotelsTableActionButton id={val} />,
    },
  ]

  const { data: HotelsData, isLoading } = useQuery({
    queryKey: ['hotels-data', currentPage],
    queryFn: async () => {
      const res = await getHotelsList({ page_size: 10, page: currentPage })
      return res
    },
    // keepPreviousData: true,
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

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
  }

  const transformedHotelsData =
    HotelsData?.results.map((item: IHotelsTable) => ({
      key: item.id.toString(),
      id: item.id,
      name: item.name,
      image: item.image,
      location: item.address,
      price: item.min_price,
      rating: item.star_rating,
      status: item.status,
      address: item.address,
      min_price: item.min_price,
      star_rating: item.star_rating,
      login: item.login,
      password: item.password,
      contactPerson: item.contactPerson,
      balance: item.balance,
    })) || []

  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IHotelsTable>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedHotelsData}
        onChange={onChange}
        className="w-full h-full"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: HotelsData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],
          itemRender: itemRender,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  )
}

export default HotelsTable
