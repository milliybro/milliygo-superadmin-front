import { Image, Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { ITourAgents } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import UsersNotFound from '@/features/users/components/users-not-found'
import dayjs from 'dayjs'
import BeachIcon from '@/components/icons/beach-icon'

const TravelAgenciesTable = ({
  AgentsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()
  const columns: TableColumnsType<ITourAgents> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: 'travel-agencies.name-agencies',
      dataIndex: 'name',
      sorter: true,
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
          <span className="text-[14px] font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'travel-agencies.license_validity',
      dataIndex: 'license_validity',
      sorter: true,
      render: item => <div>{dayjs(item).format('DD MMM, YYYY')}</div>,
    },
    {
      title: t('fields.phone.label'),
      dataIndex: 'phone_number',
      sorter: true,
      render: (phones: string[]) => (
        <div className="flex flex-col gap-[4px]">
          {phones && phones.length > 0 ? (
            phones.map((p, i) => <div key={i}>{p}</div>)
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
    },

    {
      width: 100,
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

  const transformedHotelsData = AgentsData?.results.map(
    (item: ITourAgents, i: any) => ({
      key: i,
      id: item.id,
      name: item.name,
      image: item.file,
      address: item.address?.map(addr => addr.address) ?? [],
      license_validity: item.expire_license_date,
      phone_number: item.phone_number?.map(p => p.phone_number) ?? [],
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<ITourAgents>
        columns={columns?.map(val => ({
          ...val,
          title: t(val?.title as string),
        }))}
        loading={isLoading}
        dataSource={transformedHotelsData}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="h-full w-full"
        bordered
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: AgentsData?.count || 0,
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
