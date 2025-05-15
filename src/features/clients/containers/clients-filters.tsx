import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserStatusIcon from '@/components/icons/user-status'
import UserMultipleIcon from '@/components/icons/user-multiple'
import UserSquareIcon from '@/components/icons/user-square'
import Location4Icon from '@/components/icons/location-4'
import { getCountries } from '../api'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letter'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { useEffect } from 'react'

const ClientsFilters = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await getCountries({
        page_size: 250,
      })
      return res
    },
    // keepPreviousData: true,
  })
  const INITIAL_COUNTRIES = [67, 68, 67, 70, 14, 67, 21]

  const countryOptions = Array.isArray(countries?.results)
    ? countries.results
        .map(country => ({
          index: country.id,
          value: country.id,
          label: capitalizeFirstLetters(country?.name),
        }))
        .sort((a, b) => {
          const indexA = INITIAL_COUNTRIES.indexOf(a.value)
          const indexB = INITIAL_COUNTRIES.indexOf(b.value)

          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB
          }
          if (indexA !== -1) return -1
          if (indexB !== -1) return 1

          return a.label.localeCompare(b.label)
        })
    : []

  const [searchParams, setSearchParams] = useSearchParams()

  const country = searchParams.get('country') || null
  const gender = searchParams.get('gender') || null
  const status = searchParams.get('status') || null
  const search = searchParams.get('client_search') || null

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const newParams = new URLSearchParams()

    Object.keys(allValues).forEach(key => {
      if (allValues[key]) {
        newParams.set(key, allValues[key])
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }

  const selectedCountry =
    countryOptions.find(option => option.value === Number(country))?.value ||
    null

  useEffect(() => {
    if (selectedCountry) {
      form.setFieldsValue({
        country: selectedCountry,
        gender: gender,
        status: status,
        client_search: search,
      })
    }
  }, [countryOptions, form, gender, status, search])

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-4 gap-4"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        validateDebounce={1000}
        label={t('fields.client-search.label')}
        name="client_search"
      >
        <Input
          defaultValue={search || ''}
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.client-search.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item
        name="gender"
        validateDebounce={1000}
        label={t('fields.gender.label')}
      >
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.gender.placeholder')}
          prefix={
            <UserMultipleIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        name="country"
        validateDebounce={1000}
        label={t('fields.citizenship.label')}
      >
        <CSelect
          allowClear
          options={countryOptions}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.citizenship.placeholder')}
          prefix={
            <Location4Icon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          // onChange={value => {
          //   setSelectedCountry(value)
          //   if (!value) {
          //     setSelectedCountry('')
          //   }
          // }}
        />
      </Form.Item>
      <Form.Item
        name="status"
        validateDebounce={1000}
        label={t('fields.status.label')}
      >
        <CSelect
          options={[
            { label: t('common.active'), value: 'true' },
            { label: t('common.inactive'), value: 'false' },
          ]}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.status.placeholder')}
          prefix={
            <UserStatusIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          allowClear={true}
        />
      </Form.Item>
    </Form>
  )
}

export default ClientsFilters
