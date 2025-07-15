import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import UserIcon from '@/components/icons/user'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Modal,
  Switch,
  Table,
  TableProps,
  Typography,
  Upload,
} from 'antd'
import { useState } from 'react'

function MainPageContent() {
  const [showModal, setShowModal] = useState<boolean>(false)
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
          <Button type="link" danger>
            <DeleteIcon className="text-xl" />
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-lg font-medium">
          Главная страница
        </Typography.Title>
        <Button type="primary" onClick={() => setShowModal(true)}>
          <PlusOutlined />
          Добавить
        </Button>
      </div>
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
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onClose={() => setShowModal(false)}
        closeIcon={<CloseOutlined className="text-black" />}
        footer={null}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-[62px] items-center justify-center rounded-full border-[7px] border-[#EFF6FF] bg-[#DBEAFE]">
            <UserIcon className="text-2xl text-primary" />
          </div>
          <Typography.Title level={3} className="text-2xl">
            Добавить
          </Typography.Title>
          <div className="w-full text-left">
            <Typography.Text className="text-left text-base font-medium">
              Добавить фотографии или видео
            </Typography.Text>
            <Upload.Dragger> </Upload.Dragger>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MainPageContent
