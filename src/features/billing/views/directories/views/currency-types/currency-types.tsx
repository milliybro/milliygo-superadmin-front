import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getCurrencyTypesList } from '../../api/getCurrencyTypes'
import useCurrencyTypesModalStore from '../../store/currency-types-modal-store copy'
import CurrencyTypesTable from './components/currency-types-table'
import CurrencyTypesModal from './form/currency-types-modal'

const CurrencyTypes = () => {
  const { t } = useTranslation()
  const { openModal } = useCurrencyTypesModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['currency-types', currentPage],
    queryFn: async () => {
      const res = await getCurrencyTypesList({
        size: pageSize,
        page: currentPage - 1,
      })
      return res
    },
    placeholderData: data => data,
  })
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-lg font-medium">
          {t('billing.directories.currency-types')} ({data?.totalElements})
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <CurrencyTypesModal  />
      </div>
      <CurrencyTypesTable
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

export default CurrencyTypes