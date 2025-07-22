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
      sorter: false,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <div className="size-[48px] flex justify-center items-center bg-secondary-light border-border border rounded-[8px]">
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
          <span className="text-[14px] text-primary-dark font-medium">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'travel-agencies.license_validity',
      dataIndex: 'license_validity',
      sorter: false,
      render: item => <div>{dayjs(item).format('DD MMM, YYYY')}</div>,
    },
    {
      title: t('fields.phone.label'),
      dataIndex: 'phone_number',
      sorter: false,
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
      sorter: false,
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
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<ITourAgents>
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
