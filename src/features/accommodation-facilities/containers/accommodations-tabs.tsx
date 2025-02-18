import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { TabsProps } from 'antd/lib'

import AccommodationsTable from './accommodations-table'

const AccommodationsTab = ({
  hotelsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'common.actived',
      children: (
        <AccommodationsTable
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
      label: 'common.requests',
      children: (
        <AccommodationsTable
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
      label: 'common.rejected',
      children: (
        <AccommodationsTable
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
        defaultActiveKey="1"
        items={items.map(val => ({
          ...val,
          label: t(val.label as string),
        }))}
      />
    </div>
  )
}

export default AccommodationsTab
