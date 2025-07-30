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
      label: t('common.avia'),
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
      label: t('common.railway'),
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
      label: t('common.ticket-sellerPDF'),
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
    <div className="h-full w-full flex-col overflow-hidden bg-white">
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
