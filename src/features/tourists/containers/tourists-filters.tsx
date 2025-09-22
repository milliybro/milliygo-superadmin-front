import { DatePicker, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'
import { useQuery } from '@tanstack/react-query'
import { getDistricts, getRegions } from '../api'
import { useSearchParams } from 'react-router'
import { useEffect } from 'react'
import Location4Icon from '@/components/icons/location-4'
import dayjs from 'dayjs'
import UserIcon from '@/components/icons/user'
import PassportIcon from '@/components/icons/passport-icon'
import CalendarIcon from '@/components/icons/calendar'

const TouristsFilters = () => {
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
      className="grid w-full grid-cols-6 gap-4"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label={t('tourists.tourist-fullname')}
        name="search"
        validateDebounce={1000}
      >
        <Input
          prefix={
            <UserIcon className="ml-2 mr-4 text-base font-[600] text-[#115E59]" />
          }
          size="large"
          placeholder={t('tourists.search-tourists')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item
        label={t('fields.passport-data.label')}
        name="passport"
        validateDebounce={1000}
      >
        <Input
          prefix={
            <PassportIcon className="ml-2 mr-4 text-base text-[#115E59]" />
          }
          size="large"
          placeholder={t('fields.icon.select')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item
        label={t('fields.birthyear.label')}
        className="w-full"
        name="birthyear"
      >
        <DatePicker
          prefix={
            <CalendarIcon className="mr-4 w-full text-base text-[#115E59]" />
          }
          suffixIcon={null}
          size="large"
          // placeholder={t('fields.birthyear.label')}
          className="select-shadow w-full"
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('fields.gender.label')}
        name="gender"
      >
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          prefix={
            <UserMultipleIcon className="ml-1 mr-2 text-base text-[#115E59]" />
          }
          size="large"
          placeholder={t('fields.gender.placeholder')}
          className="select-shadow"
          // value={gender}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('tourists.register-region')}
        name="region"
      >
        <CSelect
          options={regions?.results
            ?.filter(region => region.id >= 1 && region.id <= 14)
            .map(region => ({
              label: region.name,
              value: region.id,
            }))}
          className="select-shadow h-[47px] w-full"
          size="large"
          placeholder={t('fields.icon.select')}
          prefix={
            <Location4Icon className="ml-1 mr-2 text-base text-[#115E59]" />
          }
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('tourists.register-region')}
        name="district"
      >
        <CSelect
          options={districts?.results.map(district => ({
            label: district.name,
            value: district.id,
          }))}
          className="select-shadow h-[47px] w-full"
          size="large"
          placeholder={t('fields.icon.select')}
          prefix={
            <Location4Icon className="ml-1 mr-2 text-base text-[#115E59]" />
          }
          allowClear={true}
        />
      </Form.Item>
    </Form>
  )
}

export default TouristsFilters
