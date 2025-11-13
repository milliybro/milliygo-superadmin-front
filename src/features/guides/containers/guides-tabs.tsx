import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib'
import { useTranslation } from 'react-i18next'

import { useSearchParams } from 'react-router'
import GuidesList from './guides-list'

const GuidesTab = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('guide_status') || 'accepted'

  const tabConfig = [
    {
      key: 'accepted' as const,
      label: 'common.actived',
    },
    {
      key: 'in_progress' as const,
      label: 'common.request',
    },
    {
      key: 'rejected' as const,
      label: 'common.un-active',
    },
  ]

  const items: TabsProps['items'] = tabConfig.map(tab => ({
    key: tab.key,
    label: t(tab.label),
    children: tab.key === activeTab ? <GuidesList /> : null,
  }))

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white">
      <Tabs
        className="p-2"
        activeKey={activeTab || '1'}
        items={items}
        destroyOnHidden={true}
        onChange={key => {
          const newParams = new URLSearchParams(searchParams)
          newParams.set('guide_status', key)
          newParams.set('page', '1')

          setSearchParams(newParams)
        }}
      />
    </div>
  )
}

export default GuidesTab
