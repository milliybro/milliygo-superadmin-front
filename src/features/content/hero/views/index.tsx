import { useState } from 'react'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import AddModal from '../components/add-modal'
import MainContentTable from '../container/main-content-table'
import { useHeroContext } from '../hooks/use-hero-context'
import { useTranslation } from 'react-i18next'

function MainPageContent() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const {
    showDeleteModal,
    setShowDeleteModal,
    deleteBackground: { isPending, mutate },
  } = useHeroContext()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title={t('common.main-content')}
        onAddClick={() => setShowModal(true)}
      />

      <MainContentTable />

      <AddModal open={showModal} setShowModal={setShowModal} />

      <DeleteModal
        open={!!showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        title={t('content.hero.delete')}
        description={t('content.hero.delete-desc')}
        onDelete={() => {
          mutate(showDeleteModal as number)
        }}
        isLoading={isPending}
      />
    </div>
  )
}

export default MainPageContent
