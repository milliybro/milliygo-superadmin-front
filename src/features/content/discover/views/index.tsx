import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import DiscoverTable from '../components/discover-table'
import { useDiscoverContext } from '../hooks/use-discover-context'

function DiscoverContent() {
  const navigate = useNavigate()
  const { tab } = useParams()
  const {
    deleteDiscovery: { mutate, isLoading },
    deleteOpen,
    setDeleteOpen,
  } = useDiscoverContext()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Откройте Узбекистан вместе с нами"
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
        title="Удалить открытие?"
        description="Подтвердите, что вы действительно хотите удалить данное открытие?"
      />
    </div>
  )
}

export default DiscoverContent
