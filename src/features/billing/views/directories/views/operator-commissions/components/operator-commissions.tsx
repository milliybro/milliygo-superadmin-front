import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import { twMerge } from 'tailwind-merge'
import UsersNotFound from '@/features/users/components/users-not-found'
import { IOperatorCommissions } from '../../../types'
import OperatorCommmissionsTableAction from './operator-commissions-action'
import { CalculationType } from '@/features/billing/enums/enums'
import { formatNumber } from '@/features/billing/utils/formatNumber'

const OperatorCommmissionsTable = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
  refetch,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IOperatorCommissions | any> = [
    {
      title: '№',
      dataIndex: 'id',
      className: 'text-center',
      width: 39,
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1, sorter: false,
    },
    {
      title: 'fields.serviceType.label',
      dataIndex: 'serviceType',
      sorter: false,
      width: 345,
      render: (serviceType: string) => t(`billing.serviceType.${serviceType}`),
    },
    {
      title: 'fields.calculationType.label',
      dataIndex: 'calculationType',
      sorter: false,
      width: 345,
      render: (calculationType: string) => t(`billing.calculation-type.${calculationType.toLowerCase()}`),
    },
    {
      title: `${t('fields.amount.label')} / ${t('fields.percentage.label')}`,
      dataIndex: 'amount',
      sorter: false,
      width: 345,
      align: 'center',
      render: (value, data: any) => {

        return data?.calculationType ===  CalculationType.PERCENTAGE ? `${value}%` :  formatNumber(value)
      },
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      className: 'text-center',
      render: id => (
        <OperatorCommmissionsTableAction id={id} refetch={refetch} />
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

  const transformedHotelsData = data?.map(
    (item: IOperatorCommissions | any, i: any) => ({
      key: i,
      id: item?.id,
      serviceType: item?.serviceType,
      calculationType: item?.calculationType,
      amount: item?.amount,
      translates: item?.translates,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<IOperatorCommissions>
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
        showSorterTooltip={false}
      />
    </div>
  )
}

export default OperatorCommmissionsTable
