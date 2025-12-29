import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getOperatorCommissionsList } from '../../api/getOperatorCommissions'
import OperatorCommmissionsTable from './components/operator-commissions'
import OperatorCommissionModal from './form/operator-commission-modal'
import useOperatorCommissionModalStore from '../../store/operator-commission-store'

const OperatorCommissions = () => {
  const { t } = useTranslation()
  const { openModal } = useOperatorCommissionModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['operator-commissions', currentPage],
    queryFn: async () => {
      const res = await getOperatorCommissionsList({
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
          {t('billing.directories.operator-commissions')}
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <OperatorCommissionModal  />
      </div>
      <OperatorCommmissionsTable
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

export default OperatorCommissions
