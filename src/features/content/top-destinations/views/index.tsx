import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import TopDestinationsTable from '../components/top-destination-table'
import useTopDestinationsContext from '../hooks/use-top-destinations'
import { useTranslation } from 'react-i18next'

function TopDestinationsContent() {
  const navigate = useNavigate()
  const { tab } = useParams()
  const { t } = useTranslation()
  const {
    deleteOpen,
    setDeleteOpen,
    deleteTopDestination: { mutate, isLoading },
  } = useTopDestinationsContext()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title={t('content.top_destinations.title')}
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <TopDestinationsTable />
      <DeleteModal
        open={deleteOpen !== null}
        onClose={() => setDeleteOpen(null)}
        isLoading={isLoading}
        onDelete={() => {
          if (deleteOpen) {
            mutate(deleteOpen)
          }
        }}
        title={t('content.top_destinations.delete')}
        description={t('content.top_destinations.delete-desc')}
      />
    </div>
  )
}

export default TopDestinationsContent
