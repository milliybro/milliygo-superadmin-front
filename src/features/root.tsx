import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router'

import { useAuthContext } from '../contexts/auth-context'

import Layout from '../components/layout'
import Loader from '../components/ui/loader'

export default function Root(): React.ReactElement {
  const { isAuth } = useAuthContext()

  if (!isAuth) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}
