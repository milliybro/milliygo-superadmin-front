import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import EventsTable from './events-table'
import ContentHeader from '../../components/content-header'

function EventsContent() {
  const { tab } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title={t('routes.events')}
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <EventsTable />
    </div>
  )
}

export default EventsContent
