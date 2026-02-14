import { Switch } from 'antd'
import { TableProps } from 'antd/lib'
import { useTranslation } from 'react-i18next'
import CustomTable from '@/components/ui/custom-table'
import HollyTourismTitle from '@/features/content/holly-tourism/components/holly-tourism-title'
import HollyTourismAction from '@/features/content/holly-tourism/components/holly-tourism-action'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { IHollyTourism } from '@/features/content/holly-tourism/types'
import useHollyTourism from '@/features/content/holly-tourism/hooks/use-holly-tourism'

const PAGE_SIZE = 10

function HollyTourismTable() {
  const { t } = useTranslation()
  const queries = useParsedQuery()
  const { data, isPending } = useHollyTourism()

  const columns: TableProps['columns'] = [
    {
      title: '#',
      key: 'index',
      render: (_, __, index) =>
        (+(queries?.page || 1) - 1) * PAGE_SIZE + index + 1,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: t('fields.name.label'),
      render: (_, record) => (
        <HollyTourismTitle {...(record as IHollyTourism)} />
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: t('fields.status.label'),
      render: (_, record) => <Switch disabled checked={record?.status} />,
    },
    {
      key: 'action',
      title: t('common.action'),
      render: (_, record) => (
        <HollyTourismAction {...(record as IHollyTourism)} />
      ),
    },
  ]

  return (
    <CustomTable
      bordered
      rowKey="id"
      columns={columns}
      loading={isPending}
      totalCount={data?.count}
      className="custom-table-2"
      dataSource={data?.results}
      currentPage={+(queries?.page || 1)}
    />
  )
}

export default HollyTourismTable
