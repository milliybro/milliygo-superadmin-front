import { CustomRoute } from '@/types'
import Content from './views/content'
import CreateContent from './views/create-content'
import ContentLayout from './views/content-layout'

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
  ],
}

export default contentRoutes
