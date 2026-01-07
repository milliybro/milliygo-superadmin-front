import { useEffect } from 'react'
import { Tabs, Typography, TabsProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

function Directories() {
  const { t } = useTranslation()
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.billing') },
      { title: t('routes.directories') },
    ])
  }, [t])

  const tabItems: TabsProps['items'] = [
    {
      key: 'currencies',
      label: t('billing.directories.currencies'),
    },
    {
      key: 'currency-types',
      label: t('billing.directories.currency-types'),
    },
    {
      key: 'payment-providers',
      label: t('billing.directories.payment-providers'),
    },
    {
      key: 'tax-rates',
      label: t('billing.directories.tax-rates'),
      disabled: true,
    },
    {
      key: 'tourist-taxes',
      label: t('billing.directories.tourist-taxes'),
    },
    {
      key: 'subscriber-services',
      label: t('billing.directories.subscriber-services'),
    },
    {
      key: 'payments-types',
      label: t('billing.directories.payments-types'),
      disabled: true,
    },
    {
      key: 'operator-commissions',
      label: t('billing.directories.operator-commissions'),
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Typography.Text className="text-2xl font-semibold text-primary-dark">
        {t('routes.directories')}
      </Typography.Text>
      <div className="rounded-2xl border bg-white p-6">
        <Tabs
          destroyOnHidden
          children={null}
          items={tabItems.map(tab => ({
            key: tab.key,
            label: tab.label,
            children: <Outlet />,
            disabled: tab.disabled,
          }))}
          activeKey={pathname.split('/').pop()}
          onChange={key =>
            navigate(`/billing/directories/${key}`, { replace: true })
          }
        />
      </div>
    </div>
  )
}

export default Directories
