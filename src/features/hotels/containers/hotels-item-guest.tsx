import { PaginationProps, Table, TableColumnsType, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'

import { twMerge } from 'tailwind-merge'
import { IGuestsTable } from '../types'
import HotelsItemTableActionButton from '../components/hotels-items-table-action'

const columns: TableColumnsType<IGuestsTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 3,
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
    title: 'fields.citizenship.label',
    dataIndex: 'citizenship',
    sorter: {
      compare: (a, b) => a.citizenship.localeCompare(b.citizenship),
      multiple: 2,
    },
  },
  {
    title: 'common.nation',
    dataIndex: 'nation',
    sorter: {
      compare: (a, b) => a.nation.localeCompare(b.nation),
      multiple: 1,
    },
  },
  {
    title: 'common.birthdate',
    dataIndex: 'birthdate',
    sorter: {
      compare: (a, b) => a.birthdate.localeCompare(b.birthdate),
      multiple: 1,
    },
  },
  {
    title: 'common.passport',
    dataIndex: 'passport',
    sorter: {
      compare: (a, b) => a.passport.localeCompare(b.passport),
      multiple: 1,
    },
  },
  {
    title: 'common.check-in-out',
    dataIndex: 'checkInOut',
    sorter: {
      compare: (a, b) => a.checkInOut.localeCompare(b.checkInOut),
      multiple: 1,
    },
  },
  {
    width: 200,
    title: 'common.action',
    dataIndex: 'id',
    render: id => <HotelsItemTableActionButton id={id} />,
  },
]

const data: IGuestsTable[] = [
  {
    key: '1',
    id: '#TX123',
    fullName: 'Alisher Makhmudov',
    citizenship: 'Узбекистан',
    nation: 'Узбек',
    birthdate: '21.05.1990',
    passport: 'AD 123 78 96',
    checkInOut: '11.11.2024 - 12.12.2024',
    status: true,
  },
  {
    key: '2',
    id: '#TX124',
    fullName: 'Victor Chernov',
    citizenship: 'Узбекистан',
    nation: 'Узбек',
    birthdate: '21.05.1990',
    passport: 'AD 123 78 96',
    checkInOut: '11.11.2024 - 12.12.2024',
    status: false,
  },
  {
    key: '3',
    id: '#TX125',
    fullName: 'Andrei Galkin',
    citizenship: 'Узбекистан',
    nation: 'Узбек',
    birthdate: '21.05.1990',
    passport: 'AD 123 78 96',
    checkInOut: '11.11.2024 - 12.12.2024',
    status: true,
  },
  {
    key: '4',
    id: '#TX126',
    fullName: 'Alexandra Penova',
    citizenship: 'Узбекистан',
    nation: 'Узбек',
    birthdate: '21.05.1990',
    passport: 'AD 123 78 96',
    checkInOut: '11.11.2024 - 12.12.2024',
    status: false,
  },
]

const onChange: TableProps<IGuestsTable>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const HotelsItemGuest = () => {
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
    <div>
      <Table<IGuestsTable>
        columns={columns.map(val => ({
          ...val,
          title: t(`${val?.title}`),
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

export default HotelsItemGuest
