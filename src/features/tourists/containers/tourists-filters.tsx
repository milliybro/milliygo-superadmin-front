import { DatePicker, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

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
import { useParsedQuery } from '@/hooks/use-parsed-query'

const TouristsFilters = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [searchParams, setSearchParams] = useSearchParams()
  const query = useParsedQuery()

  const search = query?.full_name as string
  const passport = query?.passport_sn as string
  const birthday = query?.user_information__birth_date as string
  const gender = query?.gender as string
  const region = query?.user_information__region as string
  const district = query?.user_information__district as string

  const handleValuesChange = (_: any, allValues: any) => {
    const newParams = searchParams

    Object.keys(allValues).forEach(key => {
      const value = allValues[key]

      if (value) {
        if (key === 'user_information__birth_date') {
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
  })

  const { data: districts } = useQuery({
    queryKey: ['districts', region],
    queryFn: async () => {
      const res = await getDistricts({ region })
      return res
    },
    enabled: !!region,
  })

  useEffect(() => {
    if (form && regions?.results?.length && districts?.results?.length) {
      form.setFieldsValue({
        full_name: search,
        passport_sn: passport,
        user_information__birth_date: birthday ? dayjs(birthday) : null,
        user_information__region: region,
        user_information__district: district,
        gender,
      })
    }
  }, [form, regions, districts, query])

  return (
    <Form
      layout="vertical"
      className="grid w-full grid-cols-6 items-end gap-4"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label={t('tourists.tourist-fullname')} name="full_name">
        <Input
          prefix={
            <UserIcon className="ml-1 mr-2 text-base font-semibold text-[#115E59]" />
          }
          size="large"
          placeholder={t('tourists.search-tourists')}
          className="select-shadow font-medium"
          allowClear
        />
      </Form.Item>
      <Form.Item label={t('fields.passport-data.label')} name="passport_sn">
        <Input
          prefix={
            <PassportIcon className="mx-2 w-full text-base text-[#115E59]" />
          }
          size="large"
          placeholder={t('fields.passport-info.placeholder')}
          className="select-shadow font-medium"
          allowClear
        />
      </Form.Item>
      <Form.Item
        label={t('fields.birthyear.label')}
        className="w-full"
        name="user_information__birth_date"
      >
        <DatePicker
          prefix={
            <CalendarIcon className="mr-4 w-full text-base text-[#115E59]" />
          }
          suffixIcon={null}
          size="large"
          placeholder={t('common.specify-date')}
          className="select-shadow h-[47.3px] w-full font-medium"
        />
      </Form.Item>
      <Form.Item label={t('fields.gender.label')} name="gender">
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          prefix={
            <UserMultipleIcon className="ml-1 mr-2 text-base text-[#115E59]" />
          }
          size="large"
          placeholder={t('fields.icon.select')}
          className="select-shadow font-medium"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        label={t('tourists.register-region')}
        name="user_information__region"
      >
        <CSelect
          options={regions?.results
            ?.filter(region => region.id >= 1 && region.id <= 14)
            .map(region => ({
              label: region.name,
              value: region.id,
            }))}
          className="select-shadow h-[47px] w-full font-medium"
          size="large"
          placeholder={t('fields.icon.select')}
          prefix={
            <Location4Icon className="ml-1 mr-2 text-base text-[#115E59]" />
          }
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        label={t('tourists.register-district')}
        name="user_information__district"
      >
        <CSelect
          options={districts?.results.map(district => ({
            label: district.name,
            value: district.id,
          }))}
          className="select-shadow h-[47px] w-full font-medium"
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
