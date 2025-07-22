import { DatePicker, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useEffect } from 'react'
import Location4Icon from '@/components/icons/location-4'
import dayjs from 'dayjs'
import { getDistricts, getRegions } from '@/features/tourists/api'

const AgentsFilters = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || null
  const passport = searchParams.get('passport') || null
  const birthday = searchParams.get('birthyear') || null
  const gender = searchParams.get('gender') || null
  const region = searchParams.get('region') || null
  const district = searchParams.get('district') || null

  const handleValuesChange = (_: any, allValues: any) => {
    const newParams = new URLSearchParams()

    Object.keys(allValues).forEach(key => {
      const value = allValues[key]

      if (value) {
        if (key === 'birthyear') {
          const parsed = dayjs(value)
          if (parsed.isValid()) {
            newParams.set(key, parsed.format('YYYY-MM-DD'))
          }
        } else {
          newParams.set(key, value)
        }
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }

  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const res = await getRegions()
      return res
    },
    // keepPreviousData: true,
  })

  const { data: districts } = useQuery({
    queryKey: ['districts', region],
    queryFn: async () => {
      const res = await getDistricts({ region: region })
      return res
    },
    enabled: !!region,
  })

  useEffect(() => {
    if (form && regions?.results?.length && districts?.results?.length) {
      const regionId = region ? Number(region) : null
      const districtId = district ? Number(district) : null

      const matchedRegion = regions.results.find(r => r.id === regionId)
      const matchedDistrict = districts.results.find(d => d.id === districtId)

      form.setFieldsValue({
        search,
        passport,
        birthyear: birthday ? dayjs(birthday) : null,
        region: matchedRegion?.id || null,
        district: matchedDistrict?.id || null,
        gender,
      })
    }
  }, [form, regions, districts])

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-2 gap-4 w-full"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label={t('travel-agencies.agent-name')}
        name="search"
        validateDebounce={1000}
      >
        <Input
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('tourists.search-tourists')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('billing.city')}
        name="region"
      >
        <CSelect
          options={regions?.results
            ?.filter(region => region.id >= 1 && region.id <= 14)
            .map(region => ({
              label: region.name,
              value: region.id,
            }))}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.icon.select')}
          prefix={
            <Location4Icon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          allowClear={true}
        />
      </Form.Item>
      {/* <Form.Item
        validateDebounce={1000}
        label={t('tourists.register-region')}
        name="district"
      >
        <CSelect
          options={districts?.results.map(district => ({
            label: district.name,
            value: district.id,
          }))}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.icon.select')}
          prefix={
            <Location4Icon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          allowClear={true}
        />
      </Form.Item> */}
    </Form>
  )
}

export default AgentsFilters
