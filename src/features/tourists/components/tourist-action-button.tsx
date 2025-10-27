import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import EyeIcon from '@/components/icons/eye'
import { useCompactScreen } from '@/hooks/use-compact-screen'

interface IProps {
  id?: any
  showDrawer: () => void
}

const TouristActionButton = ({ id, showDrawer }: IProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isCompact = useCompactScreen()

  const handleClick = () => {
    navigate(`${pathname}?id=${id}`)
    showDrawer()
  }

  return (
    <Button
      type="text"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 font-medium ${
        isCompact
          ? 'flex items-center justify-center text-center text-black'
          : 'text-primary'
      }`}
    >
      <EyeIcon className="text-xl" />
      {!isCompact && t('common.more-details')}
    </Button>
  )
}

export default TouristActionButton
