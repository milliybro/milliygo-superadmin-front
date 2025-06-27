import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { createRoutesByRole } from '../routes'
import Loader from '../components/ui/loader'

import type { ReactElement } from 'react'

const role = 'admin'
export default function RouteProvider(): ReactElement {
  // const router = createBrowserRouter(routes)
  const routes = createRoutesByRole(role)
  const router = createBrowserRouter(routes)

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
