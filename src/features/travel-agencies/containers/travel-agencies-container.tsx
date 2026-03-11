import useMatchEither from '@/hooks/use-match-either'
import { Outlet } from 'react-router'

interface Props {
  of: React.ReactElement
}

export default function Container(props: Props): React.ReactElement {
  const { of } = props

  const match = useMatchEither(['/travel-agencies/:id'])

  if (match) {
    return <Outlet />
  }

  return of
}
