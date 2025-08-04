import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import DiscoverTable from '../components/discover-table'

function DiscoverContent() {
  const [deleteOpen, setDeleteOpen] = useState<number | null>(null)
  const navigate = useNavigate()
  const { tab } = useParams()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Откройте Узбекистан вместе с нами"
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />

      <DiscoverTable setDeleteOpen={setDeleteOpen} />

      <DeleteModal
        open={!!deleteOpen}
        onClose={() => setDeleteOpen(null)}
        title="Удалить направление?"
        description="Подтвердите, что вы действительно хотите удалить данное направление?"
      />
    </div>
  )
}

export default DiscoverContent
