import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { TabsProps } from 'antd/lib'

import PlacementsTable from './placements-table'
import { useSearchParams } from 'react-router'

const PlacementTabs = ({
  hotelsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('tab')

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'placements.hotels',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
    {
      key: '2',
      label: 'placements.recreation-areas',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
    {
      key: '3',
      label: 'placements.tourist-bases',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
    {
      key: '4',
      label: 'placements.boarding-houses',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
    {
      key: '5',
      label: 'placements.campsites',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
    {
      key: '6',
      label: 'placements.guest-houses',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
    {
      key: '7',
      label: 'placements.sanatoriums',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
    {
      key: '8',
      label: 'placements.hostel',
      children: (
        <PlacementsTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
  ]
  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
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
  )
}

export default PlacementTabs
