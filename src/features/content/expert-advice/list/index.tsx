import { useNavigate, useParams } from 'react-router'

import ExpertAdvicesList from './expert-advices-list'
import ContentHeader from '../../components/content-header'

function ExpertAdviceContent() {
  const { tab } = useParams()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <ContentHeader
        title="Советы экспертов"
        onAddClick={() => {
          navigate(`/content/${tab}/create`)
        }}
      />
      <ExpertAdvicesList />
    </div>
  )
}

export default ExpertAdviceContent
