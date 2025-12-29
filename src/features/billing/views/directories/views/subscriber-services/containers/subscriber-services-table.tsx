import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import { twMerge } from 'tailwind-merge'
import UsersNotFound from '@/features/users/components/users-not-found'
import { ISubscriberServices } from '../../../types'
import StatusTag from '@/components/ui/status-tag'
import SubscriberServicesTableAction from './subscriber-services-table-action'

const SubscriberServicesTable = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
  refetch,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<ISubscriberServices | any> = [
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
      title: t('fields.calculationType.label'),
      dataIndex: 'calculationType',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      sorter: false,
      width: 345,
      className: 'text-center',
    },

    {
      title: t('checkoutFrom'),
      dataIndex: 'checkoutFrom',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: t('checkoutsTo'),
      dataIndex: 'checkoutsTo',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: t('fields.status.label'),
      dataIndex: 'status',
      sorter: false,
      width: 345,
      render: (value: any) => (
        <div className="2xl:mr-0">
          <StatusTag active={value === 'ACTIVE' ? true : false} />
        </div>
      ),
      className: 'text-center',
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      className: 'text-center',
      render: id => <SubscriberServicesTableAction id={id} refetch={refetch} />,
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

  const transformedHotelsData = data?.map(
    (item: ISubscriberServices | any, i: any) => ({
      key: i,
      id: item?.id,
      activeFrom: item?.activeFrom,
      activeTo: item?.activeTo,
      amount: item?.amount,
      calculationType: item?.calculationType,
      status: item?.status,
      checkoutFrom: item?.checkoutFrom,
      checkoutsTo: item?.checkoutsTo,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<ISubscriberServices | any>
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
          total: data?.totalElements || 0,
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

export default SubscriberServicesTable
