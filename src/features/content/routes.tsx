import { CustomRoute } from '@/types'
import Content from './views/content'
import CreateContent from './views/create-content'
import ContentLayout from './views/content-layout'
import RegionSpots from './country-map/region-spots'
import CreateRegion from './country-map/create'

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
      element: <RegionSpots />,
    },
    {
      path: ':tab/:region/create',
      title: 'Create Region Content',
      element: <CreateRegion />,
    },
  ],
}

export default contentRoutes
