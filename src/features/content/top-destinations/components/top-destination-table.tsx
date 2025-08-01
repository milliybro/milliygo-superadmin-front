import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import truncateHtml from '@/helpers/truncate-html'
import { Button, Switch, Table, TableProps, Tooltip, Typography } from 'antd'
import { Dispatch, memo, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import useTopDestinationsContext from '../hooks/use-top-destinations'

interface IProps {
  setDeleteOpen: Dispatch<SetStateAction<boolean>>
}

function TopDestinationsTable({ setDeleteOpen }: IProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    topDestinations: { isFetching, data },
  } = useTopDestinationsContext()

  const destinationsData = data?.results?.map(des => ({
    title: des?.title,
    description: des?.description,
    active: des?.status,
    id: des?.id,
    key: des?.id,
  }))

  const columns: TableProps['columns'] = [
    {
      title: 'Название',
      key: 'title',
      dataIndex: 'title',
      className: 'w-2/5',
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
      key: 'active',
      dataIndex: 'active',
      width: 0,
      render: (_, record) => <Switch checked={record?.active} />,
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
              onClick={() => navigate(`edit?id=${record.id}`)}
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

  return (
    <Table
      columns={columns}
      dataSource={destinationsData}
      bordered
      loading={isFetching}
      scroll={{ x: 'max-content' }}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
        position: ['bottomCenter'],
      }}
    />
  )
}

export default memo(TopDestinationsTable)
