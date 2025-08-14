import { Tabs } from 'antd'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getPlacementTypes } from '../api'
import PlacementsTable from './placements-table'

const PlacementTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('key')

  const { data } = useQuery({
    queryKey: ['placement-types'],
    queryFn: () => getPlacementTypes(),
    refetchOnWindowFocus: false,
  })

  const items = data?.map(item => ({
    key: item?.key,
    label: item?.name,
    children: <PlacementsTable />,
  }))

  // const items: TabsProps['items'] = [
  //   {
  //     key: '1',
  //     label: 'placements.hotels',
  //     children: <PlacementsTable />,
  //   },
  //   {
  //     key: '2',
  //     label: 'placements.recreation-areas',
  //     children: <PlacementsTable />,
  //   },
  //   {
  //     key: '3',
  //     label: 'placements.tourist-bases',
  //     children: <PlacementsTable />,
  //   },
  //   {
  //     key: '4',
  //     label: 'placements.boarding-houses',
  //     children: <PlacementsTable />,
  //   },
  //   {
  //     key: '5',
  //     label: 'placements.campsites',
  //     children: <PlacementsTable />,
  //   },
  //   {
  //     key: '6',
  //     label: 'placements.guest-houses',
  //     children: <PlacementsTable />,
  //   },
  //   {
  //     key: '7',
  //     label: 'placements.sanatoriums',
  //     children: <PlacementsTable />,
  //   },
  //   {
  //     key: '8',
  //     label: 'placements.hostel',
  //     children: <PlacementsTable />,
  //   },
  // ]

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border bg-white">
      <Tabs
        className="p-2"
        activeKey={activeTab || items?.[0]?.key}
        items={items}
        // onChange={key => {
        //   setSearchParams({ tab: key })
        // }}
        onChange={key => {
          const newParams = new URLSearchParams(searchParams)
          newParams.set('key', key)
          newParams.set('page', '1')

          setSearchParams(newParams)
        }}
      />
    </div>
  )
}

export default PlacementTabs
