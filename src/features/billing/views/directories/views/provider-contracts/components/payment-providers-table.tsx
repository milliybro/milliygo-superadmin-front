import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import type { PaginationProps, TableColumnsType } from 'antd'
import { twMerge } from 'tailwind-merge'
<<<<<<< HEAD
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'
=======
import UsersNotFound from '@/features/users/components/users-not-found'
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
import ProviderContractsTableAction from './payment-providers-table-action'
import { IProviderContracts } from '../../../types'

const ProviderContractsTable = ({
  data,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IProviderContracts | any> = [
    {
      title: '№',
      dataIndex: 'id',
      className: 'text-center',
      width: 39,
<<<<<<< HEAD
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
=======
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1, sorter: false,
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
    },
    {
      title: 'fields.organization-type.label',
      dataIndex: 'organizationType',
      sorter: false,
      width: 345,
      className: 'text-center',
<<<<<<< HEAD
      render: (res: string) => t(`providers.${res?.toLocaleLowerCase()}`),
=======
      render: (res:string) => t(`providers.${res?.toLocaleLowerCase()}`) 
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      className: 'text-center',
      render: id => <ProviderContractsTableAction id={id} />,
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
    (item: IProviderContracts | any, i: any) => ({
      key: i,
      id: item?.id,
      paymentProviderId: item?.paymentProviderId,
      organisationId: item?.organisationId,
      placementId: item?.placementId,
      apartmentId: item?.apartmentId,
      gitId: item?.gitId,
      organizationType: item?.organizationType,
      validFrom: item?.validFrom,
      validTo: item?.validTo,
      params: item?.params,
    }),
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      <Table<IProviderContracts | any>
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

export default ProviderContractsTable
