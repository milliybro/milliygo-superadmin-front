import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import useSubscriberServicesModalStore from '../../store/subscriber-services-store'
import { getSubscriberServicesList } from '../../api/getSubscriberServices'
import SubscriberServicesModal from './components/subscriber-services-modal'
import SubscriberServicesTable from './containers/subscriber-services-table'

function SubscriberServices() {
  const { t } = useTranslation()
  const { openModal } = useSubscriberServicesModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()


  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['subscriber-services', currentPage],
    queryFn: async () => {
      const res = await getSubscriberServicesList({
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
          {t('billing.directories.subscriber-services')}
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <SubscriberServicesModal  />
      </div>
      <SubscriberServicesTable
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

export default SubscriberServices
