import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import TopDestinationsTable from '../components/top-destination-table'
import useTopDestinationsContext from '../hooks/use-top-destinations-context'
import { useTranslation } from 'react-i18next'
import { useDeleteTopDestination } from '../hooks/use-delete-top-destination'

function TopDestinationsContent() {
  const navigate = useNavigate()
  const { tab } = useParams()
  const { t } = useTranslation()
  const { deleteOpen, setDeleteOpen } = useTopDestinationsContext()

  const { mutate, isPending } = useDeleteTopDestination()

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
        isLoading={isPending}
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
