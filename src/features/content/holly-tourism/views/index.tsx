import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import ContentHeader from '@/features/content/components/content-header'
import HollyTourismTable from '@/features/content/holly-tourism/components/holly-tourism-table'

function HollyTourismContent() {
  const { tab } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title={t('content.holly-tourism.title')}
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />

      <HollyTourismTable />
    </div>
  )
}

export default HollyTourismContent
