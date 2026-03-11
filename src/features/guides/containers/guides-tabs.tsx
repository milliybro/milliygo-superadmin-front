import { Form, Input, Tabs } from 'antd'
import type { TabsProps } from 'antd/lib'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import GuidesList from './guides-list'
import { useSearchParams } from 'react-router'
import { SearchOutlined } from '@ant-design/icons'

function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(t)
  }, [value, delay])

  return debounced
}

const GuidesTab = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!searchParams.get('guide_status')) {
      const p = new URLSearchParams(searchParams)
      p.set('guide_status', 'accepted')
      if (!p.get('page')) p.set('page', '1')
      setSearchParams(p, { replace: true })
    }
  }, [])

  const activeTab = searchParams.get('guide_status') || 'accepted'

  const [searchValue, setSearchValue] = useState(
    () => searchParams.get('search') ?? '',
  )
  const debouncedSearch = useDebouncedValue(searchValue, 400)

  useEffect(() => {
    const q = searchParams.get('search') ?? ''
    if (q !== searchValue) setSearchValue(q)
  }, [searchParams])

  useEffect(() => {
    const current = searchParams.get('search') ?? ''
    const next = debouncedSearch.trim()

    if (current === next) return

    const p = new URLSearchParams(searchParams)
    if (next) p.set('search', next)
    else p.delete('search')

    p.set('page', '1')
    setSearchParams(p, { replace: true })
  }, [debouncedSearch])

  const tabConfig = [
    { key: 'accepted' as const, label: 'common.actived' },
    { key: 'in_progress' as const, label: 'common.request' },
    { key: 'rejected' as const, label: 'common.un-active' },
  ]

  const items: TabsProps['items'] = useMemo(
    () =>
      tabConfig.map(tab => ({
        key: tab.key,
        label: t(tab.label),
        children: tab.key === activeTab ? <GuidesList /> : null,
      })),
    [activeTab, t],
  )

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white">
      <Form layout="vertical" className="w-full p-4">
        <Form.Item className="mb-0">
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder={t('guides.search-placeholder')}
            allowClear
            size="large"
            className="h-[44px] rounded-[10px]"
            prefix={<SearchOutlined className="text-[16px] text-secondary ps-1 pe-2" />}
          />
        </Form.Item>
      </Form>

      <Tabs
        className="px-4"
        activeKey={activeTab}
        items={items}
        destroyOnHidden
        onChange={key => {
          const p = new URLSearchParams(searchParams)
          p.set('guide_status', key)
          p.set('page', '1')
          setSearchParams(p)
        }}
      />
    </div>
  )
}

export default GuidesTab
