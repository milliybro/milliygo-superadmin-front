import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../components/content-header'
import DeleteModal from '../components/delete-modal'
import InstagramTable from './list/instagram-table'

function InstagramContent() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const navigate = useNavigate()
  const { tab } = useParams()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Instagram"
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <InstagramTable setDeleteOpen={setDeleteOpen} />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Удалить Instagram?"
        description="Подтвердите, что вы действительно хотите удалить данное направление?"
      />
    </div>
  )
}

export default InstagramContent
