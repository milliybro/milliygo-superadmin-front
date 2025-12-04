import { PlusOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Button, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router"
import usePaymentsTypesModalStore from "../../store/payments-types-store"
import { getPaymentsTypesList } from "../../api/getPaymentsTypes"
import PaymentsTypesTable from "./containers/payments-types-table"
import PaymentTypesModal from "./components/payments-types-modal"

function PaymentsTypes() {
 const { t } = useTranslation()
  const { openModal } = usePaymentsTypesModalStore(store => store)
  const pageSize = 10

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const region = searchParams.get('region') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['currencies', currentPage, search, region],
    queryFn: async () => {
      const res = await getPaymentsTypesList({
        page_size: pageSize,
        page: currentPage,
        name: search ? search : null,
      })
      return res
    },
    placeholderData: data => data,
  })


  return     <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-lg font-medium">
          {t('Виды платежей')}
        </Typography.Title>

        <Button type="primary" onClick={openModal}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
        <PaymentTypesModal refetch={refetch} />
      </div>
      <PaymentsTypesTable
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
}

export default PaymentsTypes