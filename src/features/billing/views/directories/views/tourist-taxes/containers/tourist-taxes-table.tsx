import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import { twMerge } from 'tailwind-merge'
import UsersNotFound from '@/features/users/components/users-not-found'
import { ITouristTaxes } from '../../../types'
import TouristTaxesTableAction from './tourist-taxes-table-action'
import StatusTag from '@/components/ui/status-tag'

const TouristTaxesTable = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
  refetch,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<ITouristTaxes | any> = [
    {
      title: '№',
      dataIndex: 'id',
      className: 'text-center',
      width: 39,
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: t('fields.name.label'),
      dataIndex: 'name',
      sorter: false,
      width: 345,
    },
    {
      title: t('fields.placeType.label'),
      dataIndex: 'placeType',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: t('fields.calculationType.label'),
      dataIndex: 'rateType',
      sorter: false,
      width: 345,
      className: 'text-center',
      render: (calculationType: string) => t(`billing.calculation-type.${calculationType.toLowerCase()}`),
    },
    {
      title: t('fields.amount.label'),
      dataIndex: 'rate',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: t('fields.citizenship.label'),
      dataIndex: 'citizenship',
      sorter: false,
      width: 345,
      className: 'text-center',
       render: (citizenship: string) => t(`billing.citizenship.${citizenship.toLowerCase()}`),
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
      render: id => <TouristTaxesTableAction id={id} refetch={refetch} />,
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

  const transformedHotelsData = data?.content?.map(
    (item: ITouristTaxes | any, i: any) => ({
      key: i,
      id: item?.id,
      name: item?.name,
      placeType: item?.placeType,
      citizenship: item?.citizenship,
      roomsFrom: item?.roomsFrom,
      roomsTo: item?.roomsTo,
      rate: item?.rate,
      status: item?.status,
      actualFrom: item?.actualFrom,
      actualTo: item?.actualTo,
      rateType: item?.rateType,
      description: item?.description,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<ITouristTaxes | any>
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

export default TouristTaxesTable
