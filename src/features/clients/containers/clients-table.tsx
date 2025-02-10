import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'

import formatPhoneNumber from '@/helpers/format-phone-number'
import ClientsTableActionButton from '../components/clients-table-action-button'

import type { IClientTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { IUsers } from '@/features/users/types'


// const onChange: TableProps<IClientTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
//   console.log('params', pagination, filters, sorter, extra)
// }
interface ClientsFiltersProps {
  setCurrentpage: (value: number) => void
  currentPage: number
  isLoading: any
  clientsData: any
}
const ClientsTable: React.FC<ClientsFiltersProps> = ({
  clientsData,
  isLoading,
  currentPage,
  setCurrentpage,
}) => {
  const { t } = useTranslation()
  
  const columns: TableColumnsType<IClientTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'fields.fullname.label',
      dataIndex: 'fullName',
      sorter: {
        compare: (a, b) => a.fullName.localeCompare(b.fullName),
        multiple: 3,
      },
    },
    {
      title: 'fields.passport-data.label',
      dataIndex: 'passportData',
      sorter: {
        compare: (a, b) => a.passportData.localeCompare(b.passportData),
        multiple: 2,
      },
    },
    {
      title: 'fields.phone.label',
      dataIndex: 'phoneNumber',
      sorter: {
        compare: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
        multiple: 1,
      },
      render(value) {
        return formatPhoneNumber(value)
      },
    },
    {
      title: 'fields.birthyear.label',
      dataIndex: 'birthYear',
      sorter: {
        compare: (a, b) => a.birthYear - b.birthYear,
        multiple: 1,
      },
    },
    {
      title: 'fields.gender.label',
      dataIndex: 'gender',
      sorter: {
        compare: (a, b) => a.gender.localeCompare(b.gender),
        multiple: 1,
      },
      render: data => {
        return (
          <div>
            {data === 'male'
              ? t('common.men-small')
              : data === 'man'
                ? t('common.men-small')
                : t('common.women-small')}
          </div>
        )
      },
    },
    {
      title: 'fields.entry-date.label',
      dataIndex: 'entryDate',
      sorter: {
        compare: (a, b) =>
          new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
        multiple: 1,
      },
    },
    {
      title: 'fields.exit-date.label',
      dataIndex: 'exitDate',
      sorter: {
        compare: (a, b) =>
          new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime(),
        multiple: 1,
      },
    },
    {
      title: 'fields.country.label',
      dataIndex: 'country',
      sorter: {
        compare: (a, b) => a.country.localeCompare(b.country),
        multiple: 1,
      },
    },
    {
      title: 'fields.nationality.label',
      dataIndex: 'nationality',
      sorter: {
        compare: (a, b) => a.nationality.localeCompare(b.nationality),
        multiple: 1,
      },
    },
    {
      title: 'common.action',
      dataIndex: 'id',
      render: id => <ClientsTableActionButton id={id} />,
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
    setCurrentpage(page)
  }

  const transformedData =
    clientsData?.results.map((user: IUsers) => ({
      key: user.id.toString(),
      id: user.id,
      fullName:
        `${user.first_name} ${user.middle_name || ''} ${user.last_name}`.trim(),
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name || '',
      gender: user.gender,
      passportData: user.passport_sn,
      phoneNumber: user.phone,
      birthYear: user.birth_date,
      country: user.country,
    })) || []
  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IClientTable>
        columns={columns.map(val => ({
          ...val,
          title: t(val.title as string),
        }))}
        dataSource={transformedData}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="w-full h-full"
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: clientsData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],

          itemRender: itemRender,
        }}
      />
    </div>
  )
}

export default ClientsTable
