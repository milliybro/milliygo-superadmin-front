import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import useProviderContractsModalStore from '../../store/provider-contracts-store'
import { getProviderContarctsList } from '../../api/getProviderContracts'
import ProviderContractsTable from './components/payment-providers-table'
import ProviderContractModal from './form/provider-contracts-modal'
import { BillingPath } from '../../paths'

function ProviderContracts() {
  const { t } = useTranslation()
  const { openModal } = useProviderContractsModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: [BillingPath['provider-contracts'], currentPage, ],
    queryFn: async () => {
      const res = await getProviderContarctsList({
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
          {t('billing.directories.provider-contracts')}
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <ProviderContractModal />
      </div>
      <ProviderContractsTable
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

export default ProviderContracts
