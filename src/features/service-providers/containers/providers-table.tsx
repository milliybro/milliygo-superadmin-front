import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'
import UserActionButton from '../components/user-action-button'

import { truthyObject } from '@/helpers/truthy-object'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { useQuery } from '@tanstack/react-query'
import type { TableColumnsType } from 'antd'
import { TableProps } from 'antd/lib'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router'
import { getOrganizationInfo } from '../api'
import UsersNotFound from '../components/users-not-found'

const ProvidersTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queries = useParsedQuery()
  const isCompact = useCompactScreen()

  const { data: organizationData, isFetching } = useQuery({
    queryKey: ['organization-data', queries],
    queryFn: () =>
      getOrganizationInfo(truthyObject({ ...queries, page_size: 10 })),
    placeholderData: data => data,
  })

  const columns: TableColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_text, _record, index) => index + 1,
      sorter: false,
      width: 50,
    },
    {
      title: t('hotels-page.name.title'),
      dataIndex: 'name',
      sorter: true,
      width: 691.5,
      render: value => {
        return (
          <div className="flex items-center gap-2">
            {/* {record?.image ? (
              <img
                className="h-[48px] w-[48px] shrink-0 rounded-[8px] object-cover"
                src={record?.image}
                alt=""
              />
            ) : (
              <div className="flex size-[48px] items-center justify-center rounded-[8px] border border-border bg-secondary-light" />
            )} */}

            <div className="line-clamp-2 w-full">{value}</div>
          </div>
        )
      },
    },
    {
      title: t('fields.status.label'),
      dataIndex: 'status',
      sorter: true,
      render: status => <StatusTag active={status} />,
    },
    {
      title: isCompact ? '' : t('common.action'),
      width: 200,
      dataIndex: 'id',
      render: id => <UserActionButton id={id} refetch={isFetching} />,
    },
  ]
  const handleTableChange: TableProps<any>['onChange'] = (
    pagination,
    _,
    sorter,
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort.field
      : null

    const newPage = pagination.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        page: newPage,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <div className="px-4">
      <Table<any>
        columns={columns}
        dataSource={
          organizationData?.results?.map((item, i) => ({
            ...item,
            idx: i,
            key: item?.key + i,
          })) || []
        }
        className="side-borderless-table responsive-table"
        scroll={{ x: 'max-content' }}
        loading={isFetching}
        pagination={{
          current: +(queries?.page || 1),
          pageSize: 10,
          total: organizationData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}
        locale={{
          emptyText: <UsersNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default ProvidersTable
