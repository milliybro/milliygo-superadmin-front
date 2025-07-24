import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../components/content-header'
import DeleteModal from '../components/delete-modal'
import TopDestinationsTable from './list/top-destination-table'

function ExpertAdviceContent() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const navigate = useNavigate()
  const { tab } = useParams()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Советы экспертов"
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

export default ExpertAdviceContent
