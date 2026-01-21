import { useLocation, useNavigate } from 'react-router'

import CompactViewButton from '@/components/ui/compact-view-button'
import type { FC } from 'react'

interface IProps {
  id?: number
  tenant_id?: number
  type?: string
  slug?: string
}

const HotelsTableActionButton: FC<IProps> = ({ id, slug }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <CompactViewButton
      onClick={() =>
        navigate(pathname + '/' + id + '?' + (slug ? 'slug=' + slug : ''))
      }
    />
  )
}

export default HotelsTableActionButton
