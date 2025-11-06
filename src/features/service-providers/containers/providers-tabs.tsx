import { Tabs } from 'antd'

import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getOrganizationTypes } from '../api'
import { useEffect } from 'react'
import ProvidersTable from './providers-table'

const ProvidersTab = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('organization_type')

  const { data } = useQuery({
    queryKey: ['organization-types'],
    queryFn: () => getOrganizationTypes(),
    refetchOnWindowFocus: false,
  })
  const items = data?.map(item => ({
    key: item?.organization_key,
    label: item?.name,
    children: <ProvidersTable />,
  }))

  useEffect(() => {
    if (!activeTab) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('organization_type', 'autoticket')
      newParams.set('page', '1')
      setSearchParams(newParams)
    }
  }, [activeTab, searchParams, setSearchParams])

  return (
    <div className="h-full w-full flex-col overflow-hidden bg-white">
      <Tabs
        onChange={key => {
          const newParams = new URLSearchParams(searchParams)
          newParams.set('organization_type', key)
          newParams.set('page', '1')
          setSearchParams(newParams)
        }}
        className="p-2 [&_.ant-tabs-tab]:font-medium"
        activeKey={activeTab || 'house'}
        items={items}
      />
    </div>
  )
}

export default ProvidersTab
