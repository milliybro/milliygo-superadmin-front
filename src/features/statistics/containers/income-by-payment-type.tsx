import { Form } from 'antd'
import { useTranslation } from 'react-i18next'

import StatsPieChart from '../components/stats-pie-chart'

const IncomeByPaymentType = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const paymentData = [
    { label: 'UZCARD', value: 543065000 },
    { label: 'HUMO', value: 543065000 },
    { label: 'VISA', value: 543065000 },
    { label: 'Master Card', value: 543065000 },
    { label: 'Наличные', value: 543065000 },
  ]

  return (
    <StatsPieChart
      form={form}
      title="Доход по видам платежей"
      className={'col-span-2'}
      unit={t('common.sum')}
      unitShort={t('common.sum')}
      data={paymentData}
    />
  )
}

export default IncomeByPaymentType
