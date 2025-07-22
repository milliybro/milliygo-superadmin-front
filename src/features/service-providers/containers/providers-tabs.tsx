import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { TabsProps } from 'antd/lib'

import ProvidersTable from './providers-table'
import { useSearchParams } from 'react-router'

const ProvidersTab = ({
  hotelsData,
  isLoading,
  currentPage,
  pageSize,
  setCurrentPage,
}: any) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Aвиа',
      children: (
        <ProvidersTable
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
      label: 'Железная дорога',
      children: (
        <ProvidersTable
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
      label: 'Продавцы билетов',
      children: (
        <ProvidersTable
          hotelsData={hotelsData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ),
    },
  ]
  const newParams = new URLSearchParams(searchParams)

  return (
    <div className="bg-white w-full border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Tabs
        onChange={key => {
          newParams.set('tab', key)
          newParams.set('page', '1')

          setSearchParams(newParams)
        }}
        className="p-2"
        defaultActiveKey="1"
        activeKey={newParams.get('tab') || '1'}
        items={items.map(val => ({
          ...val,
          label: t(val.label as string),
        }))}
      />
    </div>
  )
}

export default ProvidersTab
