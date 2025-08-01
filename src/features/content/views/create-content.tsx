import { useLocation } from 'react-router'
import CreateExpertAdvice from '../expert-advice/create/create-expert-advice'
import CreateInstagramContent from '../instagram/create/create-instagram-content'
import CreateEvent from '../events/create/create-events'
import TopDestinationProvider from '../top-destinations/context/top-destination-context'
import TopDestinationForm from '../top-destinations/views/create/top-destination-form'
import CreateDiscoverContent from '../discover/views/create/create-discover-content'

const createForms = [
  {
    key: 'top-destinations',
    element: (
      <TopDestinationProvider>
        <TopDestinationForm />
      </TopDestinationProvider>
    ),
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
