import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import { twMerge } from 'tailwind-merge'
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'
import { ICurrencyTypes } from '../../../types'
import CurrencyTypesTableAction from './currency-types-action'
import StatusTag from '@/components/ui/status-tag'

const CurrencyTypesTable = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<ICurrencyTypes | any> = [
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
      title: 'fields.name.label',
      dataIndex: 'name',
      sorter: false,
      width: 345,
    },
    {
      title: 'fields.shortCode.label',
      dataIndex: 'code',
      sorter: false,
      width: 345,
      className: 'text-center',
    },
    {
      title: t('fields.numericCode.label'),
      dataIndex: 'numericCode',
      sorter: false,
      width: 345,
      align: 'center',
    },
    {
      title: t('fields.symbol.label'),
      dataIndex: 'symbol',
      sorter: false,
      width: 345,
      align: 'center',
      render: value => {
        return <span>{value ? value : '-'}</span>
      },
    },
    {
      title: t('fields.status.label'),
      dataIndex: 'isActive',
      sorter: false,
      width: 345,
      render: (value: any) => (
        <div className="2xl:mr-0">
          <StatusTag active={value} />
        </div>
      ),
      className: 'text-center',
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      className: 'text-center',
      render: id => <CurrencyTypesTableAction id={id} />,
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
    (item: ICurrencyTypes | any, i: any) => ({
      key: i,
      id: item?.id,
      name: item?.name,
      code: item?.code,
      numericCode: item?.numericCode,
      isActive: item?.isActive,
      symbol: item?.symbol,
      minorUnits: item?.minorUnits,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<ICurrencyTypes>
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

export default CurrencyTypesTable
