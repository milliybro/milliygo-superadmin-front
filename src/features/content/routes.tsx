import { CustomRoute } from '@/types'
import CreateRegion from './country-map/create'
import EditRegionPage from './country-map/edit'
import RegionSpotsPage from './country-map/region-spots-page'
import Content from './views/content'
import ContentLayout from './views/content-layout'
import CreateContent from './views/create-content'

const contentRoutes: CustomRoute = {
  id: 'content',
  title: 'content',
  path: 'content',
  element: <ContentLayout />,
  children: [
    {
      path: '',
      title: 'Main page',
      element: <Content />,
    },
    {
      path: ':tab',
      title: 'Content page',
      element: <Content />,
    },
    {
      path: ':tab/create',
      title: 'Create Content',
      element: <CreateContent />,
    },
    {
      path: ':tab/:region',
      title: 'Region Content',
      element: <RegionSpotsPage />,
    },
    {
      path: ':tab/:region/create',
      title: 'Create Region Content',
      element: <CreateRegion />,
    },
    {
      path: ':tab/:region/edit',
      title: 'Edit Region Content',
      element: <EditRegionPage />,
    },
  ],
}

export default contentRoutes
