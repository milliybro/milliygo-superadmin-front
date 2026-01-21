import { Tabs } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useEffect } from 'react'
import { getPlacementTypes } from '../api'
import PlacementsTable from './placements-table'

const PlacementTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('type__key')

  const { data } = useQuery({
    queryKey: ['placement-types'],
    queryFn: () => getPlacementTypes(),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!activeTab) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('type__key', 'hotel')
      newParams.set('page', '1')
      setSearchParams(newParams)
    }
  }, [activeTab, searchParams, setSearchParams])

  const items = data?.map(item => ({
    key: item?.key,
    label: item?.name,
    children: <PlacementsTable />,
  }))

  return (
    <div className="h-full rounded-[16px] border border-border bg-white">
      <Tabs
        className="p-2 [&_.ant-tabs-tab]:font-medium"
        activeKey={activeTab || 'hotel'}
        items={items}
        onChange={key => {
          const newParams = new URLSearchParams(searchParams)
          newParams.set('type__key', key)
          newParams.set('page', '1')
          setSearchParams(newParams)
        }}
      />
    </div>
  )
}

export default PlacementTabs
