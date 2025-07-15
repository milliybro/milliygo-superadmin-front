import { CustomRoute } from '@/types'
import Content from './views/content'

const contentRoutes: CustomRoute = {
  id: 'content',
  title: 'content',
  path: 'content',
  element: <Content />,
  children: [
    {
      path: ':tab',
      title: 'Main page',
      index: true,
      element: <Content />,
    },
  ],
}

export default contentRoutes
