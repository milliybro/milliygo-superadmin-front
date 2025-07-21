import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

import UsersNotFound from '@/features/users/components/users-not-found'
import type { TableColumnsType } from 'antd'
import { ITourAgents } from '../types'
import { formatAmount } from '@/helpers/format-amount'

// interface IAgenciesToursDetail {
//   key: number
//   id: number
//   name: string
//   duration: number
//   type: string
//   count_person: number
//   price: number
// }

const columns: TableColumnsType<ITourAgents> = [
  {
    title: 'common.name',
    dataIndex: 'name',
    sorter: false,
  },
  {
    title: 'travel-agencies.duration',
    dataIndex: 'duration',
    sorter: false,
    render: _ => <div className="">{_} дня</div>,
  },
  {
    title: 'travel-agencies.type-tour',
    dataIndex: 'type',
    sorter: false,
  },
  {
    title: 'travel-agencies.people-tour',
    dataIndex: 'count_person',
    sorter: false,
  },
  {
    title: 'fields.price.label',
    dataIndex: 'price',
    sorter: false,
    render: item => <div>{formatAmount(item)}</div>,
  },
]

const staticHotelsData = {
  count: 2,
  results: [
    {
      id: 1,
      name: 'Hotel Grand Palace',
      duration: 3,
      type: 'Горная прогулка',
      count_person: 4,
      price: 496443,
    },
    {
      id: 2,
      name: 'Silk Road Inn',
      duration: 3,
      type: 'Горная прогулка',
      count_person: 4,
      price: 534534,
    },
  ],
}

const TravelAgenciesTours = () => {
  const { t } = useTranslation()

  const transformHotelDetailsToTableData = (
    data: any[],
  ): any[] => {
    return data.map((item, index: any) => {
      return {
        key: index,
        id: item.id,
        name: item.name,
        duration: item.duration,
        type: item.type,
        count_person: item.count_person,
        price: item.price,
      }
    })
  }

  return (
    <Table<any>
      columns={columns.map(val => ({
        ...val,
        title: t(val?.title as string),
      }))}
      dataSource={
        staticHotelsData?.results
          ? transformHotelDetailsToTableData(staticHotelsData?.results)
          : []
      }
      pagination={false}
      locale={{
        emptyText: <UsersNotFound />,
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
      }}
    />
  )
}

export default TravelAgenciesTours
