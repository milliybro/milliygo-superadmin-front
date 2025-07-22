import { Form } from 'antd'
import { useTranslation } from 'react-i18next'

import StatsPieChart from '../components/stats-pie-chart'

const MostTimeSpentPages = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const paymentData = [
    { label: 'UZCARD', value: 12, color: '#2D7FF9' },
    { label: 'HUMO', value: 12, color: '#00B894' },
    { label: 'VISA', value: 12, color: '#D770F9' },
    { label: 'Master Card', value: 12, color: '#F55A4E' },
    { label: 'Наличные', value: 12, color: '#F6C146' },
  ]

  return (
    <StatsPieChart
      form={form}
      title="На каких страницах проводится больше времени"
      className={'col-span-2'}
      unit="гостей"
      unitShort="гостей"
      data={paymentData}
    />
  )
}

export default MostTimeSpentPages
