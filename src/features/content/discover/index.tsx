import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../components/content-header'
import DeleteModal from '../components/delete-modal'
import TopDestinationsTable from '../top-destinations/list/top-destination-table'
import { useState } from 'react'

function DiscoverContent() {
  const [deleteOpen, setDeleteOpen] = useState(false)
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

      <TopDestinationsTable setDeleteOpen={setDeleteOpen} />

      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Удалить направление?"
        description="Подтвердите, что вы действительно хотите удалить данное направление?"
      />
    </div>
  )
}

export default DiscoverContent
