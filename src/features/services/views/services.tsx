import { Button, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import AddIcon from '@/components/icons/add'
import ServicesList from '../containers/services-list'
import { TabsProps } from 'antd/lib'
import { useQuery } from '@tanstack/react-query'
import {
  getPlacementsFacilities,
  getProhibitionsFacilities,
  getRoomFacilities,
} from '../api'

const Services = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  console.log(setPageSize)

  const { setBreadCrumbs } = useBreadCrumbsStore(store => store)
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('tab')

  console.log(activeTab, 'ACTIVE')

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: ROUTE_PATHS.MAIN },
      {
        title: t('common.facilities-and-services'),
        href: ROUTE_PATHS.SERVICES,
      },
    ])
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ['room-facilities-data', currentPage],
    queryFn: async () => {
      const res = await getRoomFacilities({
        page: currentPage,
        page_size: pageSize,
      })
      return res
    },
    enabled: activeTab === '1' || activeTab === null,
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
  })

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'common.facility-room',
      children: (
        <ServicesList
          isLoading={isLoading}
          data={data}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          type={activeTab}
        />
      ),
    },
    {
      key: '2',
      label: 'common.hotel',
      children: (
        <ServicesList
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={prohibitionsFacilities}
          type={activeTab}
        />
      ),
    },
  ]

  return (
    <div className="p-6 flex flex-col gap-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="text-[24px] text-primary-dark font-semibold">
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
      <div className="bg-white border flex-col overflow-hidden border-border dark:bg-dark-bg rounded-[16px] flex items-center justify-center h-full">
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

            setSearchParams(newParams)
          }}
        />
      </div>
    </div>
  )
}

export default Services
