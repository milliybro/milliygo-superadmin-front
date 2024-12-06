import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from 'react-router'

interface RouteExtensions {
  title?: string
  Icon?: (props: Partial<object>) => React.ReactElement | null
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: Array<RouteObject & RouteExtensions>
}

type CustomRoute = (IndexRouteObject | CustomNonIndexRouteObject) &
  RouteExtensions

interface IBreadCrumb {
  title: string
  href?: string
}

interface IBreadCrumbsStore {
  breadCrumbs: IBreadCrumb[]
  setBreadCrumbs: (newBreadCrumbs: IBreadCrumb[]) => void
}

export type { CustomRoute, IBreadCrumb, IBreadCrumbsStore }
