import { useLocation } from 'react-router'
import TopDestinationForm from '../top-destinations/create/top-destination-form'
import CreateDiscoverContent from '../discover/create/create-discover-content'

const createForms = [
  {
    key: 'top-destinations',
    element: <TopDestinationForm />,
  },
  {
    key: 'discover-uzbekistan',
    element: <CreateDiscoverContent />,
  },
]

export default function CreateContent() {
  const location = useLocation()
  const currentForm = createForms.find(form =>
    location.pathname.includes(form.key),
  )
  return currentForm?.element || null
}
