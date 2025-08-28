import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import DiscoverTable from '../components/discover-table'
import { useDiscoverContext } from '../hooks/use-discover-context'
import { useTranslation } from 'react-i18next'

function DiscoverContent() {
  const navigate = useNavigate()
  const { tab } = useParams()
  const { t } = useTranslation()
  const {
    deleteDiscovery: { mutate, isLoading },
    deleteOpen,
    setDeleteOpen,
  } = useDiscoverContext()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title={t('content.discover.title')}
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />

      <DiscoverTable />

      <DeleteModal
        open={!!deleteOpen}
        onClose={() => setDeleteOpen(null)}
        isLoading={isLoading}
        onDelete={() => {
          if (deleteOpen) {
            mutate(deleteOpen)
          }
        }}
        title={t('content.discover.delete')}
        description={t('content.discover.delete-desc')}
      />
    </div>
  )
}

export default DiscoverContent
