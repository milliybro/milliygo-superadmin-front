import { Button } from 'antd'
import { useEffect, useState } from 'react'
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
  const [isCompact, setIsCompact] = useState(window.innerWidth < 1600)

  const handleClick = () => {
    navigate(`${pathname}?id=${id}`)
    showDrawer()
  }

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth < 1600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Button
      type="text"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 font-medium ${
        isCompact ? 'text-black' : 'text-primary'
      }`}
    >
      <EyeIcon className="text-xl" />
      {!isCompact && t('common.more-details')}
    </Button>
  )
}

export default TouristActionButton
