import { useLocation } from 'react-router'
import TopDestinationForm from '../top-destinations/create/top-destination-form'
import CreateDiscoverContent from '../discover/create/create-discover-content'
import CreateExpertAdvice from '../expert-advice/create/create-expert-advice'
import CreateInstagramContent from '../instagram/create/create-instagram-content'
import CreateEvent from '../events/create/create-events'

const createForms = [
  {
    key: 'top-destinations',
    element: <TopDestinationForm />,
  },
  {
    key: 'discover-uzbekistan',
    element: <CreateDiscoverContent />,
  },
  {
    key: 'expert-advice',
    element: <CreateExpertAdvice />,
  },
  {
    key: 'instagram',
    element: <CreateInstagramContent />,
  },
  {
    key: 'events',
    element: <CreateEvent />,
  },
]

export default function CreateContent() {
  const location = useLocation()
  const currentForm = createForms.find(form =>
    location.pathname.includes(form.key),
  )
  return currentForm?.element || null
}
