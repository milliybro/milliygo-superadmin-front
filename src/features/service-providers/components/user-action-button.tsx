import CompactViewButton from '@/components/ui/compact-view-button'
import { useLocation, useNavigate } from 'react-router'
import useUserModalStore from '../store/user-modal-store'

const UserActionButton = ({
  id,
}: {
  id: number
  slug?: string
  refetch: any
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openModal } = useUserModalStore(store => store)

  const editHandler = () => {
    navigate(pathname + '/' + id)
    openModal()
  }

  return (
    <div className="flex items-center gap-6">
      <CompactViewButton onClick={editHandler} />
    </div>
  )
}

export default UserActionButton
