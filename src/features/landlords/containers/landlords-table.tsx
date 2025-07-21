import { Table, Tooltip } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import HotelsTableActionButton from '../components/hotels-table-action-button'

import type { ILandlordsTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import UsersNotFound from '@/features/users/components/users-not-found'

const staticHotelsData = {
  count: 2,
  results: [
    {
      id: 1,
      placement_name: 'Hotel Grand Palace',
      location: 'Tashkent, Amir Temur street 100',
      per_price: 300000,
      status: true,
      phone_number: '+998901234567',
      contact_person: 'Alisher Mahmudov',
    },
    {
      id: 2,
      placement_name: 'Silk Road Inn',
      location: 'Samarkand, Navoi street 20',
      per_price: 280000,
      status: false,
      phone_number: '+998901234568',
      contact_person: 'Dilnoza Karimova',
    },
  ],
}

const LandlordsTable = ({
  // hotelsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()
  const hotelsData = staticHotelsData
  const columns: TableColumnsType<ILandlordsTable> = [
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
      sorter: false,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-[14px] text-primary-dark font-medium">
            {val?.placement_name ? val?.placement_name : '-'}
          </span>
        </div>
      ),
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
    {
      title: 'common.cost-per-day',
      dataIndex: 'per_price',
      sorter: false,
    },
    {
      title: 'fields.contact-person.label',
      dataIndex: 'contact_person',
      sorter: false,
    },
    {
      title: 'fields.phone.label',
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
    (item: ILandlordsTable | any, i: number) => ({
      key: i,
      id: item.id,
      placement_name: item.placement_name,
      location: item.location,
      per_price: item.per_price,
      status: item.status,
      contact_person: item.contact_person,
      phone_number: item.phone_number,
    }),
  )

  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<ILandlordsTable>
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

export default LandlordsTable
