import { useLocation } from 'react-router'
import TopDestinationForm from '../top-destinations/create/top-destination-form'

const createForms = [
  {
    key: 'top-destinations',
    element: <TopDestinationForm />,
  },
]

export default function CreateContent() {
  const location = useLocation()
  const currentForm = createForms.find(form =>
    location.pathname.includes(form.key),
  )
  return currentForm?.element || null
}
