import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import useUserModalStore from '../store/user-modal-store'
import EyeIcon from '@/components/icons/eye'

const UserActionButton = ({
  id,
}: {
  id: number
  slug?: string
  refetch: any
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { openModal } = useUserModalStore(store => store)

  const editHandler = () => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }

  return (
    <div className="flex items-center gap-6">
      <Button
        type="link"
        className="px-0 text-base font-medium"
        onClick={editHandler}
      >
        <EyeIcon className="text-xl" /> {t('common.more-details')}
      </Button>
    </div>
  )
}

export default UserActionButton
