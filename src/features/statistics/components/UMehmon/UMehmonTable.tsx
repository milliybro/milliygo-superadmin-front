import { formatAmount } from '@/helpers/format-amount'
import { Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/uz'
import { PickerLocale } from 'antd/es/date-picker/generatePicker'

function UMehmonTable({ data, isLoading }: any) {
  const { t, i18n } = useTranslation()
  const [current, setCurrent] = useState(1)
  // const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('year')
  const [locale, setLocale] = useState<PickerLocale>()
  console.log(locale, 'llll')

  const [params, setParams] = useSearchParams()

  const defaultStart = params.get('start_date')
  const defaultEnd = params.get('end_date')

  const initialRange =
    defaultStart && defaultEnd
      ? [dayjs(defaultStart), dayjs(defaultEnd)]
      : [dayjs().subtract(30, 'day'), dayjs()]

  useEffect(() => {
    if (!defaultStart || !defaultEnd) {
      const newParams = new URLSearchParams(params)
      newParams.set('start_date', initialRange[0].format('YYYY-MM-DD'))
      newParams.set('end_date', initialRange[1].format('YYYY-MM-DD'))
      setParams(newParams)
    }
  }, [])

  const dataSource = useMemo(() => {
    if (!data?.results) return []

    return data.results.map((item: any, index: number) => ({
      id: index + 1,
      placement_name: item.placement_name,
      g_count: item.g_count,
      region_name: item.region_name,
    }))
  }, [data])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 55,
    },
    {
      title: t(`hotels-page.name.title`),
      dataIndex: 'placement_name',
      key: 'placement_name',
    },
    {
      title: t(`billing.guest-count`),
      dataIndex: 'g_count',
      key: 'g_count',
      sorter: (a: any, b: any) => a.g_count - b.g_count,
      render: (value: any) => {
        return <div>{value === 0 ? '0' : formatAmount(value)}</div>
      },
    },
    {
      title: t(`fields.region.label`),
      dataIndex: 'region_name',
      key: 'region_name',
    },
  ]
  useEffect(() => {
    if (i18n.language === 'ru') {
      import('antd/es/date-picker/locale/ru_RU')
        .then(module => {
          setLocale(module.default)
        })
        .catch(console.error)
    }

    if (i18n.language === 'oz') {
      import('@/components/shared/locale/uzLatn.json')
        .then(module => {
          setLocale(module.default as PickerLocale)
        })
        .catch(console.error)
    }

    if (i18n.language === 'uz') {
      import('@/components/shared/locale/uzCyrill.json')
        .then(module => {
          setLocale(module.default as PickerLocale)
        })
        .catch(console.error)
    }
  }, [i18n.language])

  return (
    <div className="z-10 space-y-4 rounded-2xl bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-[8px] py-[9px]">
          <Typography.Text className="text-[18px] font-[600]">
            {t(`statistics.top-50`)}
          </Typography.Text>
        </div>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        bordered
        loading={isLoading}
        pagination={{
          current,
          pageSize: 10,
          onChange: page => setCurrent(page),
          position: ['bottomCenter'],
          showSizeChanger: false,
        }}
      />
    </div>
  )
}

export default UMehmonTable
