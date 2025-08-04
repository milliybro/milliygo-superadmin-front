import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { Button, Switch, Table, TableProps, Tooltip, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useDiscoverContext } from '../hooks/use-discover-context'

interface IProps {
  setDeleteOpen: (id: number | null) => void
}

function DiscoverTable({ setDeleteOpen }: IProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { discover } = useDiscoverContext()

  const columns: TableProps['columns'] = [
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
      className: 'w-1/2',
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="size-[52px] shrink-0 rounded-2xl bg-secondary"></div>
          <Typography.Text className="text-sm font-medium">
            {record?.name}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Описание',
      key: 'description',
      dataIndex: 'description',
      className: 'w-1/2',
      render: value => (
        <Typography.Text className="line-clamp-2 text-sm font-medium">
          {value || 'Нет описания'}
        </Typography.Text>
      ),
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      width: 0,
      render: () => <Switch />,
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
              onClick={() => navigate(`edit?slug=${record.id}`)}
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

  const dataSource = discover.data?.results?.map(item => ({
    key: item?.id,
    id: item?.slug,
    name: item?.name,
    description: item?.description,
    status: true,
  }))

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
        position: ['bottomCenter'],
      }}
    />
  )
}

export default DiscoverTable
