import CalendarIcon from '@/components/icons/calendar'
import LocationStarIcon from '@/components/icons/location-star-icon'
import { formatAmount } from '@/helpers/format-amount'
import { DatePicker, Select, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import 'dayjs/locale/ru'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/uz'
import { PickerLocale } from 'antd/es/date-picker/generatePicker'
import { getSalesCountry } from '../../api'
import { useQuery } from '@tanstack/react-query'
import tiles from '@/assets/tiled-bg.png'
import ArrowRightIcon from '@/components/icons/arrow-right'

function StatisticsOfVisits({
  data,
  selectedCountries,
  setSelectedCountries,
  isLoading,
}: any) {
  const { t, i18n } = useTranslation()
  const [current, setCurrent] = useState(1)
  // const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('year')
  const [locale, setLocale] = useState<PickerLocale>()

  const [params, setParams] = useSearchParams()

  const defaultStart = params.get('start_date')
  const defaultEnd = params.get('end_date')

  const initialRange =
    defaultStart && defaultEnd
      ? [dayjs(defaultStart), dayjs(defaultEnd)]
      : [dayjs().subtract(30, 'day'), dayjs()]

  const [selectedRange, setSelectedRange] = useState<any | null>(initialRange)

  useEffect(() => {
    if (!defaultStart || !defaultEnd) {
      const newParams = new URLSearchParams(params)
      newParams.set('start_date', initialRange[0].format('YYYY-MM-DD'))
      newParams.set('end_date', initialRange[1].format('YYYY-MM-DD'))
      setParams(newParams)
    }
  }, [])

  const handleRangeChange = (dates: any) => {
    if (!dates) {
      setSelectedRange(null)
      const newParams = new URLSearchParams(params)
      newParams.delete('start_date')
      newParams.delete('end_date')
      setParams(newParams)
      return
    }

    const diff = dates[1].diff(dates[0], 'day') + 1
    if (diff > 31) {
      const newEnd = dates[0].add(30, 'day')
      setSelectedRange([dates[0], newEnd])
      const newParams = new URLSearchParams(params)
      newParams.set('start_date', dates[0].format('YYYY-MM-DD'))
      newParams.set('end_date', newEnd.format('YYYY-MM-DD'))
      setParams(newParams)
      return
    }

    setSelectedRange(dates)
    const newParams = new URLSearchParams(params)
    newParams.set('start_date', dates[0].format('YYYY-MM-DD'))
    newParams.set('end_date', dates[1].format('YYYY-MM-DD'))
    setParams(newParams)
  }
  const disabledDate = (current: any) => {
    const start = selectedRange ? selectedRange[0] : null
    if (!start) return false
    const diff = current.diff(start, 'day') + 1
    return diff < 1 || diff > 31
  }
  const dataSource = useMemo(() => {
    if (!data?.data) return []
    return data.data.map((item: any, index: number) => ({
      id: index + 1,
      countryName: item.countryName,
      touristCount: item.touristCount,
      percentage: item.percentage,
    }))
  }, [data])

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 55,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 55,
      render: (a: any) => {
        return (
          <>
            <LocationStarIcon />
          </>
        )
      },
    },
    {
      title: t(`statistics.from_country`),
      dataIndex: 'countryName',
      key: 'countryName',
    },
    {
      title: t(`statistics.number-tourists`),
      dataIndex: 'touristCount',
      key: 'touristCount',
      sorter: (a: any, b: any) => a.touristCount - b.touristCount,
      render: (value: any) => {
        return <div>{formatAmount(value)}</div>
      },
    },
    {
      title: t(`statistics.ration-percent`),
      dataIndex: 'percentage',
      key: 'percentage',
      sorter: (a: any, b: any) => a.percentage - b.percentage,
      render: (value: number) => {
        const percent = Math.min(100, value)
        return (
          <div className="flex items-center gap-2">
            <div className="flex h-[15px] grow overflow-hidden rounded-full bg-secondary-light p-0.5">
              <div
                className="relative h-full rounded-full bg-[#14B8A6]"
                style={{ width: `${percent}%` }}
              >
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    backgroundImage: `url(${tiles})`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'auto 100%',
                    opacity: 0.2,
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>
            <Typography.Text className="block font-medium">
              {percent}%
            </Typography.Text>
          </div>
        )
      },
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

  const { data: salesCountry } = useQuery({
    queryKey: ['country'],
    queryFn: async () => {
      const res = await getSalesCountry({})
      return res
    },
    placeholderData: data => data,
    gcTime: 0,
  })

  return (
    <div className="z-10 space-y-4 rounded-2xl bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-[8px] py-[9px]">
          <Typography.Text className="text-[18px] font-[600]">
            {t(`statistics.total_visits`)}
          </Typography.Text>
          <Typography.Text className="text-[18px] font-[600] text-[#2563EB]">
            {formatAmount(data?.total_tourists)}
          </Typography.Text>
        </div>

        <div className="flex gap-3">
          <Select
            mode="multiple"
            size="large"
            placeholder={t('statistics.from_country')}
            className="w-[250px]"
            value={selectedCountries || []}
            onChange={setSelectedCountries}
            options={
              salesCountry && Array.isArray(salesCountry)
                ? salesCountry.map((item: any) => ({
                    label: item.name || item.label,
                    value: item.id || item.value || item.name,
                  }))
                : []
            }
            maxTagCount="responsive"
            allowClear
          />

          {/* <Select
            size="large"
            value={selectedPeriod}
            className="w-[200px]"
            onChange={value => setSelectedPeriod(value)}
            options={[
              { label: t(`statistics.month`), value: 'month' },
              { label: t(`statistics.year`), value: 'year' },
            ]}
          /> */}

          <DatePicker.RangePicker
            size="large"
            value={selectedRange}
            locale={locale}
            onChange={handleRangeChange}
            disabledDate={disabledDate}
            format="DD MMM, YYYY"
            suffixIcon={
              <CalendarIcon className="pointer-events-none text-[20px]" />
            }
            popupClassName="custom-range-picker-popup"
            className="w-[260px]"
            separator={<ArrowRightIcon className="-mt-4 text-[12px]" />}
          />
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

export default StatisticsOfVisits
