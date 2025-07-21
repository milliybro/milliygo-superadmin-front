import { Form } from 'antd'
import { useTranslation } from 'react-i18next'

import StatsPieChart from '../components/stats-pie-chart'

const RegionsWithMostBookings = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const paymentData = [
    { label: 'Hotel Plaza', value: 5430 },
    { label: 'Agata SOUL', value: 5430 },
    { label: 'Handson Moore', value: 5430 },
    { label: 'Joseph Annaly', value: 5430 },
    { label: 'Wyndham', value: 5430 },
  ]

  return (
    <StatsPieChart
      form={form}
      title="Регионы с наибольшим количеством бронирования"
      className={'col-span-2'}
      unit="бронирования"
      data={paymentData}
    />
  )
}

export default RegionsWithMostBookings
