import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import ExpertAdvicesList from './expert-advices-list'
import ContentHeader from '../../components/content-header'

function ExpertAdviceContent() {
  const { tab } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title={t('routes.expert-advices')}
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <ExpertAdvicesList />
    </div>
  )
}

export default ExpertAdviceContent
