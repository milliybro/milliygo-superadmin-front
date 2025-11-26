import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import MegaPhoneIcon from '@/components/icons/megaphone-icon'
import { truthyObject } from '@/helpers/truthy-object'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { Button, Switch, Table, TableProps, Tooltip, Typography } from 'antd'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { useDiscoverContext } from '../hooks/use-discover-context'

function DiscoverTable() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    discover,
    editDiscovery: { toggleStatusMutate, togglePending },
    setDeleteOpen,
  } = useDiscoverContext()
  const { pathname } = useLocation()
  const queries = useParsedQuery()

  const toggleStatusHandler = (slug: string, status: boolean) => {
    const formData = new FormData()
    formData.append('status', status ? 'true' : 'false')
    toggleStatusMutate({ slug, data: formData } as any)
  }

  const columns: TableProps['columns'] = [
    {
      title: t('common.name'),
      key: 'name',
      dataIndex: 'name',
      className: 'w-1/2',
      sorter: true,
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div
            className={twMerge(
              'size-[52px] shrink-0 overflow-hidden rounded-2xl',
              record?.image
                ? ''
                : 'flex items-center justify-center bg-gray-200',
            )}
          >
            {record?.image ? (
              <img
                src={record?.image || ''}
                alt="Invalid image"
                className="h-full w-full object-cover"
              />
            ) : (
              <MegaPhoneIcon className="text-lg text-secondary" />
            )}
          </div>
          <Typography.Text className="text-sm font-medium">
            {record?.name}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: t('common.description'),
      key: 'description',
      dataIndex: 'description',
      className: 'w-1/2',
      render: value => (
        <Typography.Text className="line-clamp-2 text-sm font-medium">
          {value || t('common.no-description')}
        </Typography.Text>
      ),
    },
    {
      title: t('fields.status.label'),
      key: 'status',
      dataIndex: 'status',
      width: 0,
      sorter: true,
      render: (v, record) => {
        return (
          <Switch
            checked={v}
            onChange={checked => toggleStatusHandler(record.id, checked)}
            loading={togglePending}
          />
        )
      },
    },
    {
      title: t('common.action'),
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Tooltip title={t('common.edit')}>
            <Button
              type="link"
              className="p-0"
              onClick={() => navigate(`edit/${record.id}`)}
            >
              <EditIcon className="text-xl" />
            </Button>
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <Button
              type="link"
              danger
              onClick={() => {
                setDeleteOpen(record?.id || record?.key)
              }}
              className="p-0"
            >
              <DeleteIcon className="text-xl" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

  const dataSource = discover.data?.results?.map(item => ({
    key: item?.slug,
    id: item?.slug,
    name: item?.name,
    description: item?.description,
    image: item?.image,
    status: item?.status,
  }))

  const handleTableChange: TableProps['onChange'] = (pagination, _, sorter) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + sort?.field
      : null

    const newPage = pagination?.current

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
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      onChange={handleTableChange}
      loading={discover.isFetching}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
        position: ['bottomCenter'],
        total: discover.data?.count || 0,
        current: Number(queries?.page) || 1,
      }}
    />
  )
}

export default DiscoverTable
