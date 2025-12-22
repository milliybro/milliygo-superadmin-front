import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import { twMerge } from 'tailwind-merge'
import UsersNotFound from '@/features/users/components/users-not-found'
import CurrenciesTableAction from './currencies-table-action'
import { ICurrencies } from '../../../types'

const CurrenciesTable = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
  refetch,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<ICurrencies | any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'text-center',
      width: 39,
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1, sorter: false,
    },
    {
      title: 'fields.currency_code.table',
      dataIndex: 'currencyTypeCode',
      sorter: false,
      width: 345,
      
    },
    {
      title: 'fields.currency_name.table',
      dataIndex: 'currencyTypeTranslateName',
      sorter: false,
      width: 345,
      // render: item => <div>{dayjs(item).format('DD MMM, YYYY')}</div>,
    },
    {
      title: t('fields.currency_symbol.label'),
      dataIndex: 'currencyTypeSymbol',
      sorter: false,
      width: 345,
      align: 'center',
      render: (value,) => {
        return <span>{value ? value : '-'}</span>
      },
    },
    {
      title: 'fields.course_uzs.table',
      dataIndex: 'rate',
      sorter: false,
      width: 345,
      align: 'center',
      render: (value) => {
        return <span>{value ? value : '-'}</span>
      },
    },
    {
      title: t('fields.course_source.label'),
      dataIndex: 'source',
      sorter: false,
      width: 345,
      align: 'center',
      render: (value) => {
        return <span>{value ? value : '-'}</span>
      },

    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      className: 'text-center',
      render: id => <CurrenciesTableAction id={id} refetch={refetch} />,
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
    (item: ICurrencies | any, i: any) => ({
      key: i,
      id: item?.id,
      currencyTypeId: item?.currencyTypeId,
      currencyTypeCode: item?.currencyTypeCode,
      currencyTypeSymbol: item?.currencyTypeSymbol,
      currencyTypeTranslateName: item?.currencyTypeTranslateName,
      rate: item?.rate,
      rateDate: item?.rateDate,
      source: item?.source,
      date: item?.date,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<ICurrencies>
        columns={columns?.map(val => ({ ...val, title: t(val?.title as string), }))}
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

export default CurrenciesTable
