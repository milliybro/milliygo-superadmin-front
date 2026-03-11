import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import { twMerge } from 'tailwind-merge'
<<<<<<< HEAD
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'
=======
import UsersNotFound from '@/features/users/components/users-not-found'
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
import StatusTag from '@/components/ui/status-tag'
import { IPaymentProviders } from '../../../types'
import PaymentProvidersTableAction from './payment-providers-table-action'
import { CalculationType } from '@/features/billing/enums/enums'
import { formatNumber } from '@/features/billing/utils/formatNumber'

const PaymentProvidersTable = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
  refetch,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IPaymentProviders | any> = [
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
      title: 'fields.payment-providers.label',
      dataIndex: 'name',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: 'fields.providers-type.label',
      dataIndex: 'type',
      sorter: false,
      width: 345,
      className: 'text-center',
<<<<<<< HEAD
      render: (providerType: string) =>
        t(`billing.provider-type.${providerType.toLowerCase()}`),
=======
      render: (providerType: string) => t(`billing.provider-type.${providerType.toLowerCase()}`),
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
    },
    {
      title: t('fields.provider-code.label'),
      dataIndex: 'code',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: t('fields.supportedCurrencies.label'),
      dataIndex: 'supportedCurrencies',
      sorter: false,
      width: 345,
      className: 'text-center',
      render: (value: string[]) => (
        <div className="flex w-[200px] flex-wrap items-center justify-center gap-1">
          {value?.map((currency, index) => (
            <span key={index} className="rounded-md bg-slate-100 px-2 py-1">
              {currency}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'fields.calculationType.label',
      dataIndex: 'calculationType',
      sorter: false,
      width: 345,
      className: 'text-center',
<<<<<<< HEAD
      render: (calculationType: string) =>
        t(`billing.calculation-type.${calculationType.toLowerCase()}`),
=======
      render: (calculationType: string) => t(`billing.calculation-type.${calculationType.toLowerCase()}`),
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
    },
    {
      title: `${t('fields.amount.label')} / ${t('fields.percentage.label')}`,
      dataIndex: 'commissionRate',
      sorter: false,
      width: 345,
      className: 'text-center',
      render: (value, data: any) =>
<<<<<<< HEAD
        data?.calculationType === CalculationType.PERCENTAGE
          ? `${value}%`
          : formatNumber(value),
=======
        data?.calculationType === CalculationType.PERCENTAGE ? `${value}%` : formatNumber(value),
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
    },
    {
      title: 'fields.minAmount.label',
      dataIndex: 'minAmount',
      sorter: false,
      width: 345,
      className: 'text-center',
      render: value => formatNumber(value),
    },
    {
      title: 'fields.maxAmount.label',
      dataIndex: 'maxAmount',
      sorter: false,
      width: 345,
      className: 'text-center',
<<<<<<< HEAD
      render: value => formatNumber(value),
=======
      render: value => formatNumber(value)
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
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
      render: id => <PaymentProvidersTableAction id={id} refetch={refetch} />,
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
    (item: IPaymentProviders | any, i: any) => ({
      key: i,
      id: item?.id,
      name: item?.name,
      code: item?.code,
      type: item?.type,
      status: item?.status,
      minAmount: item?.minAmount,
      maxAmount: item?.maxAmount,
      commissionRate: item?.commissionRate,
      calculationType: item?.calculationType,
      supportedCurrencies: item?.supportedCurrencies,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<IPaymentProviders | any>
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

export default PaymentProvidersTable
