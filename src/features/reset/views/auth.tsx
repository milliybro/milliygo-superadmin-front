import { Navigate, Outlet, useMatch } from 'react-router'
import { useAuthContext } from '../../../contexts/auth-context'

const Auth: React.FC = function Auth() {
  const match = useMatch('/auth/sign-in')
  const { isAuth } = useAuthContext()

  if (isAuth) {
    return <Navigate to="/" replace />
  }

  if (match !== null) {
    return <Outlet />
  }

  return null
}

export default Auth
