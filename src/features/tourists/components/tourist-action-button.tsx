import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import EyeIcon from '@/components/icons/eye'

interface IProps {
  id?: any
  showDrawer: () => void
}

const TouristActionButton = ({ id, showDrawer }: IProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const handleClick = () => {
    navigate(pathname + '?' + 'id=' + id)
    showDrawer()
  }

  return (
    <Button
      className="inline-flex items-center gap-2 font-medium text-primary"
      type="text"
      onClick={handleClick}
    >
      <EyeIcon className="text-xl" />
      {t('common.more-details')}
    </Button>
  )
}

export default TouristActionButton
