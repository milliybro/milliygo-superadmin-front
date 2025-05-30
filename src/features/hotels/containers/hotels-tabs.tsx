import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { TabsProps } from 'antd/lib'

import HotelsTable from './hotels-table'
import { useSearchParams } from 'react-router'

const HotelsTab = ({
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
      label: 'common.hotels',
      children: (
        <HotelsTable
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
      label: 'common.houses-and-apartments',
      children: (
        <HotelsTable
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
      label: 'common.resorts',
      children: (
        <HotelsTable
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
      label: 'common.hostels',
      children: (
        <HotelsTable
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

export default HotelsTab
