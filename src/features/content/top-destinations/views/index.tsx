import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../../components/content-header'
import DeleteModal from '../../components/delete-modal'
import TopDestinationsTable from '../components/top-destination-table'

function TopDestinationsContent() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const navigate = useNavigate()
  const { tab } = useParams()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Лучшие направления"
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <TopDestinationsTable setDeleteOpen={setDeleteOpen} />
      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Удалить направление?"
        description="Подтвердите, что вы действительно хотите удалить данное направление?"
      />
    </div>
  )
}

export default TopDestinationsContent
