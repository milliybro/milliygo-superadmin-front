import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { Button, Switch, Table, TableProps, Typography } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  setDeleteOpen: Dispatch<SetStateAction<boolean>>
}

function TopDestinationsTable({ setDeleteOpen }: IProps) {
  const columns: TableProps['columns'] = [
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
      className: 'w-1/2',
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="size-[52px] rounded-2xl bg-secondary"></div>
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
      render: () => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Button type="link">
            <EditIcon className="text-xl" />
            Редактировать
          </Button>
          <Button type="link" danger onClick={() => setDeleteOpen(true)}>
            <DeleteIcon className="text-xl" />
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const dataSource = [
    {
      key: '1',
      name: 'Париж',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse a corruptiiure pariatur? Molestiae consequuntur, quia explicabo optio quidem fugitratione dolorem neque modi inventore ipsa asperiores corporis reprehenderit minima.',
      status: true,
    },
  ]

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

export default TopDestinationsTable
