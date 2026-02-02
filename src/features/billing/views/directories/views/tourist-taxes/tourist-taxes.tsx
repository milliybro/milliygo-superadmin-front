import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import useTouristTaxesStore from '../../store/tourist-taxes-store'
import TouristTaxesTable from './containers/tourist-taxes-table'
import TouristTaxesModal from './components/tourist-taxes-modal'
import { getTouristTaxesList } from '../../api/getTouristTaxes'

function TouristTaxes() {
  const { t } = useTranslation()
  const { openModal } = useTouristTaxesStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()


  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['tourist-taxes', currentPage ],
    queryFn: async () => {
      const res = await getTouristTaxesList({
        page_size: pageSize,
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
          {t('billing.directories.tourist-taxes')} ({data?.totalElements ?? 0})
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <TouristTaxesModal  />
      </div>
      <TouristTaxesTable
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

export default TouristTaxes
