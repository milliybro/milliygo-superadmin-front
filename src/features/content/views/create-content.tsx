import { useLocation } from 'react-router'
import CreateExpertAdvice from '../expert-advice/create/create-expert-advice'
import CreateInstagramContent from '../instagram/create/create-instagram-content'
import CreateEvent from '../events/create/create-events'
import TopDestinationProvider from '../top-destinations/context/top-destination-context'
import TopDestinationForm from '../top-destinations/views/create/create-top-destination'
import CreateDiscoverContent from '../discover/views/create/create-discover-content'
import DiscoverProvider from '../discover/context'
import HeroProvider from '../hero/context'
import EditHero from '../hero/views/edit-hero'
import HollyTourismForm from '../holly-tourism/views/create'

const createForms = [
  {
    key: 'main',
    element: (
      <HeroProvider>
        <EditHero />
      </HeroProvider>
    ),
  },
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
    element: (
      <DiscoverProvider>
        <CreateDiscoverContent />
      </DiscoverProvider>
    ),
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
  {
    key: 'holly-tourism',
    element: <HollyTourismForm />,
  },
]

export default function CreateContent() {
  const location = useLocation()

  const currentForm = createForms.find(form =>
    location.pathname?.split('/')?.at(2)?.includes(form.key),
  )
  return currentForm?.element || null
}
