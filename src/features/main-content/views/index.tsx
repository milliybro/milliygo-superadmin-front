import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import Content from '../containers/main-content'

const MainContent = () => {
  const { t } = useTranslation()

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)

  // const [searchTerm, setSearchTerm] = useState('')
  // const [gender, setGender] = useState('')
  // const [role, setRole] = useState('')
  // const [isActive, setIsActive] = useState(null)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      { title: t('home-content.title'), href: ROUTE_PATHS.ACCOMMODATIONS },
    ])
  }, [])

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('home-content.title')}
        </div>
      </div>
      <Content />
    </div>
  )
}

export default MainContent
