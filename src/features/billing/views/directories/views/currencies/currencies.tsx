import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getCurrenciesList } from '../../api/getCurrencies'
import CurrenciesTable from './containers/currencies-table'
import CurrencyModal from './components/currencies-modal'
import useCurrenciesModalStore from '../../store/currencies-modal-store'

const Currencies = () => {
  const { t } = useTranslation()
  const { openModal } = useCurrenciesModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const region = searchParams.get('region') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['currencies', currentPage, search, region],
    queryFn: async () => {
      const res = await getCurrenciesList({
        size: pageSize,
        page: currentPage - 1 ,
      })
      console.log(res)
      return res
    },
    placeholderData: data => data,
  })
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-lg font-medium">
          {t('billing.directories.currencies')}
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <CurrencyModal  />
      </div>
      <CurrenciesTable
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

export default Currencies
