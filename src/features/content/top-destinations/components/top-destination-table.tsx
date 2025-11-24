import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { truthyObject } from '@/helpers/truthy-object'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { useMutation } from '@tanstack/react-query'
import {
  Button,
  Image,
  Switch,
  Table,
  TableProps,
  Tooltip,
  Typography,
} from 'antd'
import queryString from 'query-string'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { editTopDestinationPartial } from '../api'
import useTopDestinations from '../hooks/use-top-destinations'
import useTopDestinationsContext from '../hooks/use-top-destinations-context'

function TopDestinationsTable() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const queries = useParsedQuery()

  const { setDeleteOpen } = useTopDestinationsContext()
  const { data, isFetching, refetch } = useTopDestinations()
  const isCompact = useCompactScreen()

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
    region: des?.region,
    status: des?.status,
    id: des?.id,
    key: des?.id,
    image: (des?.images?.find(val => val?.is_main) || des?.images?.[0])
      ?.file_path,
  }))

  const toggleStatusHandler = useCallback((id: number, status: boolean) => {
    const formData = new FormData()
    formData.append('status', String(status))
    mutate({ id, data: formData })
  }, [])

  const columns: TableProps['columns'] = [
    {
      title: t('common.name'),
      key: 'title',
      dataIndex: 'title',
      className: 'w-2/4',
      sorter: true,
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (value, record) => {
        return (
          <div className="flex items-center gap-4">
            <div className="size-10 overflow-hidden rounded-xl">
              <Image
                src={record?.image}
                alt="Top Destination"
                className="h-full w-full object-cover"
                rootClassName="w-full h-full"
              />
            </div>
            <Typography.Text className="text-sm font-medium">
              {value}
            </Typography.Text>
          </div>
        )
      },
    },
    {
      title: t('billing.region'),
      key: 'region',
      dataIndex: 'region',
      className: 'w-2/4 ',
      sorter: true,
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: value => {
        return (
          <div className="flex items-center gap-4">
            <Typography.Text className="text-sm font-medium">
              {value}
            </Typography.Text>
          </div>
        )
      },
    },
    // {
    //   title: t('fields.description.label'),
    //   key: 'description',
    //   dataIndex: 'description',
    //   className: 'w-2/5',
    //   width: 589,
    //   sorter: true,
    //   render: (value, record) => {
    //     return (
    //       <div className="flex items-center gap-4">
    //         <Typography.Text className="text-sm font-medium">
    //           {value}
    //         </Typography.Text>
    //       </div>
    //     )
    //   },
    // },
    {
      title: t('fields.status.label'),
      key: 'status',
      dataIndex: 'status',
      width: 107,
      sorter: true,
      render: (_, record) => (
        <Switch
          checked={record?.status}
          onChange={checked => toggleStatusHandler(record?.id, checked)}
        />
      ),
    },
    {
      title: t('common.action'),
      key: 'action',
      dataIndex: 'action',
      width: 209,
      render: (_, record) => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Tooltip title={t('common.edit')}>
            <Button
              type="link"
              className="p-0"
              onClick={() => navigate(`edit/${record.id}`)}
            >
              <EditIcon className="text-xl" />{' '}
              {isCompact ? '' : t('common.edit')}
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
              {isCompact ? '' : t('common.delete')}
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
      className="tourists-table"
    />
  )
}

export default memo(TopDestinationsTable)
