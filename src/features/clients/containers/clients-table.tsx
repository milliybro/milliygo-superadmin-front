import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'

import formatPhoneNumber from '@/helpers/format-phone-number'
import ClientsTableActionButton from '../components/clients-table-action-button'

import type { IClientTable } from '../types'
import type { PaginationProps, TableColumnsType, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'

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

const data: IClientTable[] = [
  {
    key: '1',
    id: 1,
    fullName: 'John Brown',
    passportData: 'AB1234567',
    phoneNumber: '+998901234567',
    birthYear: 1990,
    gender: 'Мужчина',
    entryDate: '2024-12-01',
    exitDate: '2024-12-05',
    country: 'Узбекистан',
    nationality: 'Узбек',
  },
  {
    key: '2',
    id: 2,
    fullName: 'Jim Green',
    passportData: 'CD9876543',
    phoneNumber: '+998901111111',
    birthYear: 1985,
    gender: 'Мужчина',
    entryDate: '2024-12-10',
    exitDate: '2024-12-15',
    country: 'Казахстан',
    nationality: 'Казах',
  },
  {
    key: '3',
    id: 3,
    fullName: 'Joe Black',
    passportData: 'EF1230987',
    phoneNumber: '+998902222222',
    birthYear: 1995,
    gender: 'Мужчина',
    entryDate: '2024-12-20',
    exitDate: '2024-12-25',
    country: 'Россия',
    nationality: 'Русский',
  },
  {
    key: '4',
    id: 4,
    fullName: 'Jim Red',
    passportData: 'GH9871234',
    phoneNumber: '+998903333333',
    birthYear: 1988,
    gender: 'Мужчина',
    entryDate: '2025-01-05',
    exitDate: '2025-01-10',
    country: 'Турция',
    nationality: 'Турок',
  },
]

const onChange: TableProps<IClientTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const ClientsTable = () => {
  const { t } = useTranslation()

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
  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IClientTable>
        columns={columns.map(val => ({
          ...val,
          title: t(val.title as string),
        }))}
        dataSource={data}
        onChange={onChange}
        className="w-full h-full"
        pagination={{
          pageSize: 10,
          total: 100,
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
