import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { IApartmentsTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import UsersNotFound from '@/features/users/components/users-not-found'
import { formatAmount } from '@/helpers/format-amount'
import AddressCell from '../components/address-cell'

const LandlordsTable = ({
  ApartmentsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()
  const columns: TableColumnsType<IApartmentsTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: 'common.name',
      dataIndex: 'placement_name',
      sorter: true,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.placement_name ? val?.placement_name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'fields.location.label',
      width: 200,
      dataIndex: 'location',
      sorter: true,
      render: (_, data) => <AddressCell lat={data.lat} lon={data.long} />,
    },
    {
      title: 'common.cost-per-day',
      dataIndex: 'per_price',
      sorter: true,
      render: item => (
        <div className="flex items-center gap-[10px] text-center">
          {item ? (
            <div>{formatAmount(item)} UZS</div>
          ) : (
            <div className="text-center">-</div>
          )}
        </div>
      ),
    },
    {
      title: 'fields.contact-person.label',
      dataIndex: 'contact_person',
      sorter: true,
    },
    {
      title: 'fields.phone.label',
      dataIndex: 'phone_number',
      sorter: true,
      render: _ => (
        <div className="flex items-center gap-[10px] text-center">
          {_ ? _ : <div className="text-center">-</div>}
        </div>
      ),
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: true,
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

  console.log(ApartmentsData, 'AAAAA')

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

  const transformedHotelsData = ApartmentsData?.results.map(
    (item: IApartmentsTable | any, i: number) => ({
      key: i,
      id: item.id,
      placement_name: item.apartment_name,
      location: item.location,
      per_price: item.room_price,
      status: item.status,
      contact_person: item.full_name,
      phone_number: item.phone,
      lat: item.lat,
      long: item.long,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white p-6">
      <Table<IApartmentsTable>
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
          total: ApartmentsData?.count || 0,
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

export default LandlordsTable
