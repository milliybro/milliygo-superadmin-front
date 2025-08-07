import { useEffect } from 'react'
import { Tabs, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import type { TabsProps } from 'antd'
import DiscoverContent from '../discover/views'
import MainPageContent from '../hero/views'
import TopDestinationsContent from '../top-destinations/views'
import CountryMap from '../country-map/views/list'
import TopDestinationProvider from '../top-destinations/context/top-destination-context'
import DiscoverProvider from '../discover/context'
import ExpertAdviceContent from '../expert-advice/list'
import InstagramContent from '../instagram/list'
import EventsContent from '../events/list'

function Content() {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const navigate = useNavigate()
  const { tab } = useParams()

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content') },
    ])
  }, [])

  const tabItems: TabsProps['items'] = [
    {
      key: 'main',
      label: 'Main page',
      children: <MainPageContent />,
    },
    {
      key: 'top-destinations',
      label: 'Top Destinations',
      children: (
        <TopDestinationProvider>
          <TopDestinationsContent />
        </TopDestinationProvider>
      ),
    },
    {
      key: 'discover-uzbekistan',
      label: 'Discover Uzbekistan',
      children: (
        <DiscoverProvider>
          <DiscoverContent />
        </DiscoverProvider>
      ),
    },
    {
      key: 'country-map',
      label: t('content.country-map.title'),
      children: <CountryMap />,
    },
    {
      key: 'expert-advice',
      label: 'Expert Advice',
      children: <ExpertAdviceContent />,
    },
    {
      key: 'instagram',
      label: 'Instagram',
      children: <InstagramContent />,
    },
    {
      key: 'events',
      label: 'Events',
      children: <EventsContent />,
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Typography.Text className="text-2xl font-semibold text-primary-dark">
        {t('routes.content')}
      </Typography.Text>
      <div className="rounded-2xl border bg-white p-6">
        <Tabs
          destroyOnHidden
          items={tabItems}
          activeKey={tab || 'main'}
          onChange={key => navigate(`/content/${key}`, { replace: true })}
        />
      </div>
    </div>
  )
}

export default Content
