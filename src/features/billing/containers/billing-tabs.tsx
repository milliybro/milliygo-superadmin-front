import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { TabsProps } from 'antd/lib'

import { useSearchParams } from 'react-router'
import BillingAccrualTable from './billing-accrual'
import BillingPaymentsTable from './billing-payment'
import BillingRecalculateTable from './billing-recalculation'
import BillingReportTable from './billing-report'

const BillingTab = ({
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
      label: 'billing.accrual',
      children: (
        <BillingAccrualTable
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
      label: 'billing.payments',
      children: (
        <BillingPaymentsTable
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
      label: 'billing.recalculations',
      children: (
        <BillingRecalculateTable
          guidesData={guidesData}
          isLoading={isLoading}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          type="unActive"
        />
      ),
    },
    {
      key: '4',
      label: 'billing.tour-levy-report',
      children: (
        <BillingReportTable
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

export default BillingTab
