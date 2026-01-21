import { useLocation, useNavigate } from 'react-router'

import CompactViewButton from '@/components/ui/compact-view-button'

interface IProps {
  id?: any
  showDrawer: () => void
}

const TouristActionButton = ({ id, showDrawer }: IProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    const params = new URLSearchParams(location.search)

    if (id) {
      params.set('id', id)
    }

    navigate(`${location.pathname}?${params.toString()}`)
    showDrawer()
  }

  return <CompactViewButton onClick={handleClick} />
}

export default TouristActionButton
