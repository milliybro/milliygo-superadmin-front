import { useLocation, useNavigate } from 'react-router'

import CompactViewButton from '@/components/ui/compact-view-button'
import type { FC } from 'react'

interface IProps {
  id?: number
}

const ClientsTableActionButton: FC<IProps> = ({ id }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return <CompactViewButton onClick={() => navigate(pathname + '/' + id)} />
}

export default ClientsTableActionButton
