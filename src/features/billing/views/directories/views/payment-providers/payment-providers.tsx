import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { getPaymentProvidersList } from '../../api/getPaymentProviders'
import { useSearchParams } from 'react-router'
import usePaymentProvidersModalStore from '../../store/payment-providers-store'
import PaymentProvidersTable from './containers/payment-providers-table'
import PaymentProvidersModal from './components/payment-providers-modal'

function PaymentProviders() {
  const { t } = useTranslation()
  const { openModal } = usePaymentProvidersModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['payment-providers', currentPage, ],
    queryFn: async () => {
      const res = await getPaymentProvidersList({
        size: pageSize,
        page: (currentPage - 1),
      })
      return res
    },
    placeholderData: data => data,
  })

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-lg font-medium">
          {t('billing.directories.payment-providers')} ({data?.totalElements ?? 0})
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <PaymentProvidersModal />
      </div>
      <PaymentProvidersTable
        data={data}
        isLoading={isFetching}
        refetch={refetch}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={(page: number) => {
          setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set('page', String(page))
            return params
          })
        }}
      />
    </div>
  )
}

export default PaymentProviders
