import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { TabsProps } from 'antd/lib'

import { useSearchParams } from 'react-router'
import GuidesTable from './guides-table'

const GuidesTab = ({
  guidesData,
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
      label: 'common.actived',
      children: (
        <GuidesTable
          guidesData={guidesData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          type="active"
        />
      ),
    },
    {
      key: '2',
      label: 'common.request',
      children: (
        <GuidesTable
          guidesData={guidesData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          type="request"
        />
      ),
    },
    {
      key: '3',
      label: 'common.un-active',
      children: (
        <GuidesTable
          guidesData={guidesData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          type="unActive"
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

export default GuidesTab
