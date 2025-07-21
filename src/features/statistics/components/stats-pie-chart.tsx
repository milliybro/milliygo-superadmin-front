import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Doughnut } from 'react-chartjs-2'
import { Card, DatePicker, Form } from 'antd'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { formatAmount } from '@/helpers/format-amount'

import CalendarIcon from '@/components/icons/calendar'

import type { FormInstance } from 'antd/lib'

ChartJS.register(ArcElement, Tooltip, Legend)

const colors = [
  '#2563EB',
  '#EF4444',
  '#EAB308',
  '#14B8A6',
  '#8B5CF6',
  '#F97316',
  '#22C55E',
  '#EC4899',
  '#0EA5E9',
  '#A855F7',
]

interface IProps {
  title: string
  className?: string
  form?: FormInstance<any>
  data: {
    label: string
    value: number
  }[]
  unit?: string
  unitShort?: string
}
const StatsPieChart: FC<IProps> = props => {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>(
    props?.data?.map((_, idx) => idx),
  )

  const toggleVisibility = (index: number) => {
    setVisibleIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    )
  }

  const visibleData = props?.data?.map((val, idx) =>
    visibleIndexes?.includes(idx) ? val.value : 0,
  )
  const total = visibleData?.reduce((acc, val) => acc + val, 0)

  const donutData = {
    labels: props?.data?.map(val => val.label),
    datasets: [
      {
        data: visibleData,
        backgroundColor: colors,
        borderRadius: 6,
        spacing: 10,
      },
    ],
  }

  return (
    <Card className={props.className} classNames={{ body: '!p-0' }}>
      <div
        className={twMerge(
          'flex items-center justify-between px-6 border-b',
          props?.form ? 'py-3' : 'py-6',
        )}
      >
        <h3 className="font-medium leading-[20px] text-[18px]">
          {props?.title}
        </h3>
        {props.form ? (
          <Form form={props?.form}>
            <Form.Item name="date">
              <DatePicker
                picker="year"
                size="large"
                suffixIcon={
                  <CalendarIcon className="text-[18px] text-success-dark" />
                }
              />
            </Form.Item>
          </Form>
        ) : null}
      </div>

      <div className="grid grid-cols-2">
        <div className="p-6 h-[295px] mx-auto">
          <Doughnut
            data={donutData}
            options={{
              responsive: true,
              cutout: '78%',
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    label: (context: any) => {
                      return formatAmount(context?.raw)
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="border-l px-6 py-6 flex flex-col">
          <div className="text-[30px] font-semibold mb-6">
            {formatAmount(total)} {props?.unit}
          </div>

          <ul className="space-y-4">
            {props?.data?.map((item, idx) => {
              const isVisible = visibleIndexes?.includes(idx)
              const value = props?.data?.[idx]?.value

              return (
                <li
                  key={item.label}
                  onClick={() => toggleVisibility(idx)}
                  className={twMerge(
                    'flex items-center justify-between cursor-pointer group',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-[2px]"
                      style={{
                        backgroundColor: colors[idx],
                        opacity: isVisible ? 1 : 0.3,
                      }}
                    />
                    <span
                      className={twMerge(
                        'text-sm font-medium transition text-[#9CA3AF]',
                        isVisible ? '' : 'opacity-50 line-through',
                      )}
                    >
                      {item?.label}
                    </span>
                  </div>

                  <span
                    className={`text-sm font-medium text-primary-dark transition ${
                      isVisible ? '' : ' opacity-50 line-through'
                    }`}
                  >
                    {formatAmount(value)} {props?.unitShort}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export default StatsPieChart
