import { Image, Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { ITourAgents } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import UsersNotFound from '@/features/users/components/users-not-found'
import dayjs from 'dayjs'
import BeachIcon from '@/components/icons/beach-icon'
import { getTourAgentsList } from '../api'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

const pageSize = 10

const TravelAgenciesTable = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const search = searchParams.get('search') || ''
  const region = searchParams.get('region') || ''

  const setCurrentPage = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      params.set('page', String(page))
      return params
    })
  }

  const columns: TableColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      width: 39,
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: 'travel-agencies.name-agencies',
      dataIndex: 'name',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <div className="flex size-[48px] items-center justify-center rounded-[8px] border border-border bg-secondary-light">
            {val?.file ? (
              <Image
                src={val?.file}
                alt={val?.name}
                width={48}
                height={48}
                className="rounded-[8px] object-cover"
              />
            ) : (
              <BeachIcon fontSize={28} />
            )}
          </div>
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'travel-agencies.license_validity',
      dataIndex: 'license_validity',
      sorter: true,
      width: 345,
      render: item => <div>{dayjs(item).format('DD MMM, YYYY')}</div>,
    },
    {
      title: t('fields.phone.label'),
      dataIndex: 'phone_number',
      sorter: true,
      width: 345,

      render: (phone: string) => (
        <div className="flex flex-col gap-[4px]">
          {phone && phone.length > 0 ? (
            <div>{phone}</div>
          ) : (
            <div className="text-center">-</div>
          )}
        </div>
      ),
    },
    {
      title: 'fields.address.label',
      dataIndex: 'address',
      sorter: true,
      width: 345,
      render: (address: string) => (
        <div className="line-clamp-2" title={address}>
          {address}
        </div>
      ),
    },
    {
      width: 156,
      title: 'common.action',
      render: (id, val: any) => (
        <HotelsTableActionButton
          key={id}
          id={val.id}
          tenant_id={val.tenant ?? undefined}
          type={val?.type}
          slug={val.name}
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

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
  }

  const { data, isFetching } = useQuery({
    queryKey: ['tour-agents', currentPage, search, region],
    queryFn: async () => {
      const res = await getTourAgentsList({
        page_size: pageSize,
        page: currentPage,
        address: region ? region : null,
        name: search ? search : null,
      })
      return res
    },
    placeholderData: data => data,
  })

  const transformedHotelsData = data?.results.map(
    (item: ITourAgents, i: any) => ({
      key: i,
      id: item?.id,
      name: item?.name,
      file: item?.file,
      address: item?.address,
      expire_license_date: item?.expire_license_date,
      phone_number: item?.phone_number,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isFetching}
        dataSource={transformedHotelsData}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="h-full w-full"
        bordered
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: data?.count || 0,
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

export default TravelAgenciesTable
