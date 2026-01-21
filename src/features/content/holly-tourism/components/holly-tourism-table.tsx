import { Switch } from 'antd'
import { TableProps } from 'antd/lib'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import CustomTable from '@/components/ui/custom-table'
import HollyTourismTitle from '@/features/content/holly-tourism/components/holly-tourism-title'
import HollyTourismAction from '@/features/content/holly-tourism/components/holly-tourism-action'
import { truthyObject } from '@/helpers/truthy-object'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { IHollyTourism } from '@/features/content/holly-tourism/types'
import useHollyTourism from '@/features/content/holly-tourism/hooks/use-holly-tourism'

const PAGE_SIZE = 10

function HollyTourismTable() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queries = useParsedQuery()
  const { pathname } = useLocation()
  const { data, isPending } = useHollyTourism()

  const handleTableChange: TableProps['onChange'] = (pagination, _, sorter) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort?.field
      : null

    const newPage = pagination?.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        ordering,
        page: newPage,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

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
      sorter: true,
    },
    {
      sorter: true,
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
      onChange={handleTableChange}
      currentPage={+(queries?.page || 1)}
    />
  )
}

export default HollyTourismTable
