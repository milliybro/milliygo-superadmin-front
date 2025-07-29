import { useState } from 'react'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import AddModal from '../components/add-modal'
import MainContentTable from '../container/main-content-table'

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
        onClose={() => setShowDeleteModal(false)}
        title="Удалить фон?"
        description="Подтвердите, что вы действительно хотите удалить данного контекстa?"
      />
    </div>
  )
}

export default MainPageContent
