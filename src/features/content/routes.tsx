import { CustomRoute } from '@/types'
import Content from './views/content'
import ContentLayout from './views/content-layout'
import CreateContent from './views/create-content'
import CountryMapLayout from './country-map/layouts'
import RegionSpots from './country-map/region-spots'
import CreateRegionSpot from './country-map/views/create/create-region-spot'
import EditRegionSpot from './country-map/views/edit/edit-region-spot'

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
      path: 'country-map/:region',
      element: <CountryMapLayout />,
      children: [
        {
          path: '',
          element: <RegionSpots />,
        },
        {
          path: 'create',
          element: <CreateRegionSpot />,
        },
        {
          path: 'edit',
          element: <EditRegionSpot />,
        },
      ],
    },
  ],
}

export default contentRoutes
