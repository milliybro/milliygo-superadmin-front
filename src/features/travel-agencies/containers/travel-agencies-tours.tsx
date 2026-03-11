import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

import type { TableColumnsType } from 'antd'
import { IAgentTourData, ITourAgents } from '../types'
import { formatAmount } from '@/helpers/format-amount'
import { useQuery } from '@tanstack/react-query'
import { getTourAgentTours } from '../api'
import { useParams } from 'react-router'
import UsersNotFound from '@/features/accommodation-facilities/components/users-not-found'

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
    render: val => <div className="">{val} дня</div>,
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

const TravelAgenciesTours = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  const { data } = useQuery({
    queryKey: ['agent-tour', id],
    queryFn: async () => {
      const res = await getTourAgentTours({ tour_agent_id: id })
      return res
    },
    enabled: !!id,
  })

  const transformHotelDetailsToTableData = (data: IAgentTourData[]): any[] => {
    return data.map((item, index: any) => {
      return {
        key: index,
        id: item.id,
        name: item.name,
        duration: item.duration_days,
        type: item.type_tour,
        count_person: item.number_people,
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
        data?.results ? transformHotelDetailsToTableData(data?.results) : []
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
