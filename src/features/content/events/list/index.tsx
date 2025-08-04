import { useNavigate, useParams } from 'react-router'

import EventsTable from './events-table'
import ContentHeader from '../../components/content-header'

function EventsContent() {
  const { tab } = useParams()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Мероприятия"
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <EventsTable />
    </div>
  )
}

export default EventsContent
