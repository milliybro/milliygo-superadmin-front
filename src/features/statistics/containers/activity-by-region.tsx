import { Form } from 'antd'

import StatsPieChart from '../components/stats-pie-chart'

const ActivityByRegion = () => {
  const [form] = Form.useForm()

  const paymentData = [
    { label: 'Hotel Plaza', value: 543065000 },
    { label: 'Agata SOUL', value: 543065000 },
    { label: 'Handson Moore', value: 543065000 },
    { label: 'Joseph Annaly', value: 543065000 },
    { label: 'Wyndham', value: 543065000 },
  ]

  return (
    <StatsPieChart
      form={form}
      title="Активность по регионам"
      className={'col-span-2'}
      unit="гостей"
      unitShort="гостей"
      data={paymentData}
    />
  )
}

export default ActivityByRegion
