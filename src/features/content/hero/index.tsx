import { useState } from 'react'
import ContentHeader from '../components/content-header'
import DeleteModal from '../components/delete-modal'
import AddModal from './list/add-modal'
import MainContentTable from './list/main-content-table'

function MainPageContent() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Главная страница"
        onAddClick={() => setShowModal(true)}
      />

      <MainContentTable setDeleteOpen={setShowDeleteModal} />

      <AddModal open={showModal} setShowModal={setShowModal} />

      <DeleteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        title="Удалить фон?"
        description="Подтвердите, что вы действительно хотите удалить данного контекстa?"
      />
    </div>
  )
}

export default MainPageContent
