import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { Button, Switch, Table, TableProps } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  setDeleteOpen: Dispatch<SetStateAction<boolean>>
}

function MainContentTable({ setDeleteOpen }: IProps) {
  const columns: TableProps['columns'] = [
    {
      title: 'Картина',
      key: 'image',
      dataIndex: 'image',
      className: 'w-1/2',
      render: () => (
        <div className="size-[52px] rounded-2xl bg-secondary"></div>
      ),
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      className: 'w-1/2',
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
  return (
    <Table
      columns={columns}
      dataSource={[{ key: '1' }]}
      bordered
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
        position: ['bottomCenter'],
      }}
    />
  )
}

export default MainContentTable
