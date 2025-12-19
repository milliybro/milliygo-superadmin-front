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
  const location = useLocation()
  const isCompact = useCompactScreen()

  const handleClick = () => {
    const params = new URLSearchParams(location.search)

    if (id) {
      params.set('id', id)
    }

    navigate(`${location.pathname}?${params.toString()}`)
    showDrawer()
  }

  return (
    <Button
      type="text"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 font-medium p-0 m-0 ${
        isCompact
          ? 'flex items-center justify-center text-center text-black text-[14px]'
          : 'text-primary'
      }`}
    >
      <EyeIcon className="text-[16px]" />
      {!isCompact && t('common.more-details')}
    </Button>
  )
}

export default TouristActionButton
