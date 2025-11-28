import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import ReportsTable from './reports-table'
import { useMemo, useState } from 'react'
import ReportsFilters from './reports-filters'

const ReportsTab = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)

  const activeTab = searchParams.get('tab')

  const items: TabsProps['items'] = useMemo(
    () =>
      [
        {
          key: '1',
          label: 'billing.reports.providers',
        },
        {
          key: '2',
          label: 'billing.reports.suppliers',
        },
        {
          key: '3',
          label: 'billing.reports.tour-report',
        },
        {
          key: '4',
          label: 'billing.reports.user-payment',
        },
        {
          key: '5',
          label: 'billing.reports.commission',
        },
        {
          key: '6',
          label: 'billing.reports.return',
        },
        {
          key: '7',
          label: 'billing.reports.platform-report',
        },
      ].map(item => ({
        key: item.key,
        label: item?.label,
        children: (
          <div className="flex flex-col gap-4">
            <ReportsFilters setCurrentPage={setCurrentPage} />
            <ReportsTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ),
      })),
    [],
  )
  return (
    <div className="h-full overflow-hidden rounded-[16px] border border-border bg-white p-6 dark:bg-dark-bg">
      <Tabs
        className="[&_.ant-form-item-label]:font-medium [&_.ant-tabs-tab]:font-medium"
        activeKey={activeTab || '1'}
        items={items.map(val => ({
          ...val,
          label: t(val.label as string),
        }))}
        onChange={key => {
          const newParams = new URLSearchParams(searchParams)
          newParams.set('tab', key)
          setCurrentPage(1)

          setSearchParams(newParams)
        }}
      />
    </div>
  )
}

export default ReportsTab
