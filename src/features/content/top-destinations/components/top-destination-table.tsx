import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import truncateHtml from '@/helpers/truncate-html'
import { truthyObject } from '@/helpers/truthy-object'
import { useMutation } from '@tanstack/react-query'
import { Button, Switch, Table, TableProps, Tooltip, Typography } from 'antd'
import queryString from 'query-string'
import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { editTopDestinationPartial } from '../api'
import useTopDestinationsContext from '../hooks/use-top-destinations'

function TopDestinationsTable() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { search, pathname } = useLocation()
  const queries = useMemo(() => queryString.parse(search), [search])

  const {
    topDestinations: { isFetching, data, refetch },
    setDeleteOpen,
  } = useTopDestinationsContext()

  const { mutate } = useMutation({
    mutationKey: ['editTopDestination'],
    mutationFn: ({ id, data }: { id: number | string; data: FormData }) =>
      editTopDestinationPartial(id!, data),
    onSuccess: () => {
      refetch()
    },
  })

  const destinationsData = data?.results?.map(des => ({
    title: des?.title,
    description: des?.description,
    status: des?.status,
    id: des?.id,
    key: des?.id,
  }))

  const toggleStatusHandler = useCallback((id: number, status: boolean) => {
    const formData = new FormData()
    formData.append('status', String(status))
    mutate({ id, data: formData })
  }, [])

  const columns: TableProps['columns'] = [
    {
      title: 'Название',
      key: 'title',
      dataIndex: 'title',
      className: 'w-2/5',
      sorter: true,
      render: value => (
        <div className="flex items-center gap-4">
          <Typography.Text className="text-sm font-medium">
            {value}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Описание',
      key: 'description',
      dataIndex: 'description',
      className: 'h-[80px] overflow-hidden',
      render: value => {
        return <div className="max-w-[400px]">{truncateHtml(value, 100)}</div>
      },
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      width: 0,
      sorter: true,
      render: (_, record) => (
        <Switch
          checked={record?.status}
          onChange={checked => toggleStatusHandler(record?.id, checked)}
        />
      ),
    },
    {
      title: 'Действие',
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
              onClick={() => setDeleteOpen(record?.id || record?.key || null)}
              className="p-0"
            >
              <DeleteIcon className="text-xl" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

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
      dataSource={destinationsData}
      bordered
      loading={isFetching}
      scroll={{ x: 'max-content' }}
      onChange={handleTableChange}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
        position: ['bottomCenter'],
        total: data?.count,
        current: Number(queries?.page) || 1,
      }}
    />
  )
}

export default memo(TopDestinationsTable)
