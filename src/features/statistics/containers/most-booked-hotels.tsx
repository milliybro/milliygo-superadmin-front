import { Form } from 'antd'

import StatsPieChart from '../components/stats-pie-chart'

const MostBookedHotels = () => {
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
      title="ТОП-10 самых забронированных гостиниц"
      className={'col-span-2'}
      unit="гостей"
      unitShort="гостей"
      data={paymentData}
    />
  )
}

export default MostBookedHotels
