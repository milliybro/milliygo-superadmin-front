import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'
import { IPaymentsTypes } from '../../../types'
import PaymentsTypesTableAction from './payments-types-table-action'

const PaymentsTypesTable = ({
  AgentsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
  refetch,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IPaymentsTypes | any> = [
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
      title: 'Онлайн',
      dataIndex: 'name',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'Наличный',
      dataIndex: 'license_validity',
      sorter: true,
      width: 345,
      render: item => <div>{dayjs(item).format('DD MMM, YYYY')}</div>,
    },
    {
      title: t('Безналичный'),
      dataIndex: 'phone_number',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: t('Частичная оплата'),
      dataIndex: 'phone_number',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },

    {
      title: t('Списание из депозита'),
      dataIndex: 'phone_number',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: t('Компенсация'),
      dataIndex: 'phone_number',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: t('Оплата через 1С'),
      dataIndex: 'phone_number',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      title: t('Госфинансирование'),
      dataIndex: 'phone_number',
      sorter: true,
      width: 345,
      render: (_, val) => (
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-medium text-primary-dark">
            {val?.name ? val?.name : '-'}
          </span>
        </div>
      ),
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      render: id => <PaymentsTypesTableAction id={id} refetch={refetch} />,
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

  const transformedHotelsData = AgentsData?.results?.map(
    (item: IPaymentsTypes | any, i: any) => ({
      key: i,
      id: item?.id,
      name: item?.name,
      image: item?.file,
      license_validity: item?.expire_license_date,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<IPaymentsTypes | any>
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

export default PaymentsTypesTable
