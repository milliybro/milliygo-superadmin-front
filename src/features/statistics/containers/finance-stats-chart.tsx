import { Card, Tabs, DatePicker, Form } from 'antd'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js'

// import CalendarIcon from '@/components/icons/calendar'
import { formatAmount } from '@/helpers/format-amount'

import type { FC } from 'react'
import Calendar3Icon from '@/components/icons/calendar-3'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
)

const staticFinanceData = [
  { date: '2025-01-01', total_amount: 120000000 },
  { date: '2025-02-01', total_amount: 150000000 },
  { date: '2025-03-01', total_amount: 180000000 },
  { date: '2025-04-01', total_amount: 140000000 },
  { date: '2025-05-01', total_amount: 200000000 },
  { date: '2025-06-01', total_amount: 220000000 },
  { date: '2025-07-01', total_amount: 190000000 },
]

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      displayColors: false,
      backgroundColor: '#ffffff',
      bodyColor: '#111827',
      mode: 'nearest' as const,
      borderColor: '#E5E7EB',
      borderWidth: 1,
      intersect: false,
      callbacks: {
        title: () => [],
        label: (context: any) => `${formatAmount(context.parsed.y)} млн сум`,
      },
    },
  },
  interaction: {
    mode: 'nearest' as const,
    intersect: false,
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { display: false, color: '#E5E7EB' },
      ticks: { color: '#6B7280' },
      border: { display: false },
    },
    x: {
      grid: { color: '#E5E7EB' },
      ticks: { color: '#6B7280' },
      border: { display: false },
    },
  },
}

const FinanceStatsChart: FC<{ className?: string }> = props => {
  const { t } = useTranslation()

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: staticFinanceData.map(item => item.total_amount / 1000000),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(248, 113, 113, 0.25)')
          gradient.addColorStop(1, 'rgba(248, 113, 113, 0)')
          return gradient
        },
        borderColor: '#FF4B55',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#FF4B55',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF4B55',
        pointBorderWidth: 2,
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  }

  return (
    <Card
      className={twMerge('w-full', props?.className)}
      classNames={{ body: '!p-0' }}
    >
      <div className="flex flex-col p-4 border-b">
        <h2 className="font-bold text-[20px] mb-2">
          Статистика финансов и доходов (млн сум)
        </h2>
        <Form className="flex items-center justify-between">
          <Form.Item name="date_type">
            <Tabs
              defaultActiveKey="year"
              className="[&_.ant-tabs-nav]:m-0"
              items={[
                { label: 'По годам', key: 'year' },
                { label: 'По месяцам', key: 'month' },
              ]}
            />
          </Form.Item>
          <Form.Item name="date">
            <DatePicker
              picker="year"
              size="large"
              suffixIcon={
                <Calendar3Icon className="text-[18px] text-success-dark" />
              }
            />
          </Form.Item>
        </Form>
      </div>
      <div className="p-6">
        <Line data={chartData} options={chartOptions} height={90} />
      </div>
    </Card>
  )
}

export default FinanceStatsChart
