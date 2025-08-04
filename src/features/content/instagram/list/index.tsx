import { useNavigate, useParams } from 'react-router'

import InstagramTable from './instagram-table'
import ContentHeader from '../../components/content-header'

function InstagramContent() {
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
      <InstagramTable />
    </div>
  )
}

export default InstagramContent
