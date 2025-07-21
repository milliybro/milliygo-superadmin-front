import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import { useSearchParams } from 'react-router'
import ProvidersTab from '../containers/providers-tabs'

const Accommodations = () => {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const pageSize = 10

  // const [searchTerm, setSearchTerm] = useState('')
  // const [gender, setGender] = useState('')
  // const [role, setRole] = useState('')
  // const [isActive, setIsActive] = useState(null)

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      {
        title: t('routes.service-providers'),
        href: ROUTE_PATHS.SERVICE_PROVIDERS,
      },
    ])
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1

  // const { data, isFetching } = useQuery({
  //   queryKey: ['hotels-data', currentPage, type, search, status],
  //   queryFn: async () => {
  //     const res = await getHotels({
  //       page_size: pageSize,
  //       page: currentPage,
  //       search,
  //       status,
  //       is_approved:
  //         type === '1'
  //           ? 'approved'
  //           : type === '2'
  //             ? 'new'
  //             : type === '3'
  //               ? 'cancelled'
  //               : type,
  //       // placement_name: name,
  //       // username: username,
  //       // full_name: fullName,
  //       // status: status,
  //     })
  //     return res
  //   },
  //   placeholderData: data => data,
  // })
  const data: any = []

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
          {t('routes.service-providers')}
        </div>
      </div>
      <div className="bg-white border w-full flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] flex items-center justify-center h-full">
        <ProvidersTab
          hotelsData={data}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={(page: number) =>
            setSearchParams(prev => {
              const params = new URLSearchParams(prev)
              params.set('page', String(page))
              return params
            })
          }
        />
      </div>
    </div>
  )
}

export default Accommodations
