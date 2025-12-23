import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import UsersNotFound from '@/features/users/components/users-not-found'
import { ICurrencies } from '../../../types'
import TouristTaxesTableAction from './subscriber-services-table-action'
import StatusTag from '@/components/ui/status-tag'

const SubscriberServicesTable = ({
  AgentsData,
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
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: 'Название услуги ',
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
      title: 'Описание',
      dataIndex: 'license_validity',
      sorter: true,
      width: 345,
      render: item => <div>{dayjs(item).format('DD MMM, YYYY')}</div>,
    },
    {
      title: t('Тип средства размещения'),
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
      title: t('Кол-во гостей в месяц'),
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
      title: t('Тип тарифа'),
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
      title: t('Абонентская плата'),
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
      title: t('Валюта'),
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
      title: t('Период'),
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
      title: t('Примечание'),
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
      title: t('Статус'),
      dataIndex: 'id',
      sorter: true,
      width: 345,
      render: (value: any) => (
        <div className="2xl:mr-0">
          <StatusTag active={value} />
        </div>
      ),
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
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

  const transformedHotelsData = AgentsData?.results?.map(
    (item: ICurrencies | any, i: any) => ({
      key: i,
      id: item.id,
      name: item.name,
      image: item.file,
      address: item.address?.map((addr: any) => addr.address) ?? [],
      license_validity: item.expire_license_date,
      phone_number: item.phone_number?.map((p: any) => p.phone_number) ?? [],
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<ICurrencies | any>
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

export default SubscriberServicesTable
