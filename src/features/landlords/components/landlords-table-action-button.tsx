import { useLocation, useNavigate } from 'react-router'

import CompactViewButton from '@/components/ui/compact-view-button'
import type { FC } from 'react'

interface IProps {
  id?: number
  tenant_id?: number
  type?: string
}

const LandlordsTableActionButton: FC<IProps> = ({ id, tenant_id, type }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <CompactViewButton
      onClick={() =>
        navigate(
          pathname +
            '/' +
            id +
            '?' +
            (tenant_id !== undefined ? 'tenant_id=' + tenant_id + '&' : '') +
            (type !== undefined ? 'type=' + type : ''),
        )
      }
    />
  )
}

export default LandlordsTableActionButton
