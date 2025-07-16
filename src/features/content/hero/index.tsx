import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useState } from 'react'
import AddModal from './list/add-modal'
import MainContentTable from './list/main-content-table'
import DeleteModal from './list/delete-modal'

function MainPageContent() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

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

      <MainContentTable setDeleteOpen={setShowDeleteModal} />

      <AddModal open={showModal} setShowModal={setShowModal} />

      <DeleteModal open={showDeleteModal} setOpen={setShowDeleteModal} />
    </div>
  )
}

export default MainPageContent
