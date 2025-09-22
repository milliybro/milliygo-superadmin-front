import { Button, Tabs } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddIcon from '@/components/icons/add'
import { useQuery } from '@tanstack/react-query'
import { TabsProps } from 'antd/lib'
import {
  getPlacementsFacilities,
  getProhibitionsFacilities,
  getRoomFacilities,
} from '../api'
import ServicesList from '../containers/services-list'

const Services = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const pageSize = 10

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const activeTab = searchParams.get('tab')

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      {
        title: t('common.facilities-and-services'),
        href: ROUTE_PATHS.SERVICES,
      },
    ])
  }, [])

  const { data, isFetching } = useQuery({
    queryKey: ['room-facilities-data', currentPage],
    queryFn: async () => {
      const res = await getRoomFacilities({
        page: currentPage,
        page_size: pageSize,
      })
      return res
    },
    placeholderData: data => data,
    enabled: activeTab === '1' || activeTab === null,
    gcTime: 0,
  })

  const { data: placementFacilities } = useQuery({
    queryKey: ['placements-facilities-data', currentPage],
    queryFn: async () => {
      const res = await getPlacementsFacilities({
        page: currentPage,
        page_size: pageSize,
      })
      return res
    },
    enabled: activeTab === '2',
    gcTime: 0,
  })

  const { data: prohibitionsFacilities } = useQuery({
    queryKey: ['prohibitions-facilities-data', currentPage],
    queryFn: async () => {
      const res = await getProhibitionsFacilities({
        page: currentPage,
        page_size: pageSize,
      })
      return res
    },
    enabled: activeTab === '3',
    gcTime: 0,
  })

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'common.facility-room',
      children: (
        <ServicesList
          isLoading={isFetching}
          data={data}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={(page: number) =>
            setSearchParams(prev => {
              const params = new URLSearchParams(prev)
              params.set('page', String(page))
              return params
            })
          }
          type={activeTab}
        />
      ),
    },
    {
      key: '2',
      label: 'common.hotel',
      children: (
        <ServicesList
          isLoading={isFetching}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={(page: number) =>
            setSearchParams(prev => {
              const params = new URLSearchParams(prev)
              params.set('page', String(page))
              return params
            })
          }
          data={placementFacilities}
          type={activeTab}
        />
      ),
    },
    {
      key: '3',
      label: 'common.prohibitions',
      children: (
        <ServicesList
          isLoading={isFetching}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={(page: number) =>
            setSearchParams(prev => {
              const params = new URLSearchParams(prev)
              params.set('page', String(page))
              return params
            })
          }
          data={prohibitionsFacilities}
          type={activeTab}
        />
      ),
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div className="text-2xl font-semibold text-primary-dark">
          {t('common.facilities-and-services')}
        </div>
        <Button
          className="inline-flex items-center gap-2"
          type="primary"
          onClick={() => navigate(pathname + '/create')}
        >
          <AddIcon /> {t('services-page.add-user')}
        </Button>
      </div>
      <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white dark:bg-dark-bg">
        <Tabs
          className="p-2"
          activeKey={activeTab || '1'}
          items={items.map(val => ({
            ...val,
            label: t(val.label as string),
          }))}
          // onChange={key => {
          //   setSearchParams({ tab: key })
          // }}
          onChange={key => {
            const newParams = new URLSearchParams(searchParams)
            newParams.set('tab', key)
            newParams.set('page', '1')

            setSearchParams(newParams)
          }}
        />
      </div>
    </div>
  )
}

export default Services
