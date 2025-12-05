import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { getTaxRatesList } from '../../api/getTaxRates'
import useTaxRatesModalStore from '../../store/tax-rates-store'
import TaxRatesTable from './containers/tax-rates-table'
import TaxRatesModal from './components/tax-rates-modal'

function TaxRates() {
  const { t } = useTranslation()
  const { openModal } = useTaxRatesModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const region = searchParams.get('region') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['currencies', currentPage, search, region],
    queryFn: async () => {
      const res = await getTaxRatesList({
        page_size: pageSize,
        page: currentPage,
        name: search ? search : null,
      })
      return res
    },
    placeholderData: data => data,
  })

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-lg font-medium">
          {t('Налоговые ставки')}
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <TaxRatesModal refetch={refetch} />
      </div>
      <TaxRatesTable
        AgentsData={data}
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

export default TaxRates
