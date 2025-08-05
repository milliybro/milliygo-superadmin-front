import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import TopDestinationsTable from '../components/top-destination-table'
import useTopDestinationsContext from '../hooks/use-top-destinations'

function TopDestinationsContent() {
  const navigate = useNavigate()
  const { tab } = useParams()
  const {
    deleteOpen,
    setDeleteOpen,
    deleteTopDestination: { mutate, isLoading },
  } = useTopDestinationsContext()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Лучшие направления"
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
        title="Удалить направление?"
        description="Подтвердите, что вы действительно хотите удалить данное направление?"
      />
    </div>
  )
}

export default TopDestinationsContent
