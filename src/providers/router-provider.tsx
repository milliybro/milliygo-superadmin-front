import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import routes from '../routes'

import Loader from '../components/ui/loader'

import type { ReactElement } from 'react'

export default function RouteProvider(): ReactElement {
  const router = createBrowserRouter(routes)

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
