import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ContentHeader from '../components/content-header'
import DeleteModal from '../components/delete-modal'
import EventsTable from './list/events-table'

function EventsContent() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const navigate = useNavigate()
  const { tab } = useParams()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Мероприятия"
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <EventsTable setDeleteOpen={setDeleteOpen} />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Удалить направление?"
        description="Подтвердите, что вы действительно хотите удалить данное направление?"
      />
    </div>
  )
}

export default EventsContent
