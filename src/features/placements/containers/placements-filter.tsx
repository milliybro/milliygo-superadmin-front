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
import { getRegions } from '@/features/content/api'
import { getDistricts } from '@/features/tourists/api'
import { PhoneOutlined, StarOutlined } from '@ant-design/icons'
import StarIcon from '@/components/icons/star'
import FileIcon from '@/components/icons/file-icon'
import FileVerifiedIcon from '@/components/icons/file-verified-icon'

const PlacementsFilters = () => {
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
      className="mb-6 grid w-full grid-cols-6 gap-4 px-2"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label={t('hotels-page.name.title')}
        name="name"
        validateDebounce={1000}
      >
        <Input
          prefix={
            <UserSquareIcon className="ml-2 mr-4 text-[16px] text-secondary" />
          }
          size="large"
          placeholder={t('hotels-page.name.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('hotels-page.region')}
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
            <Location4Icon className="ml-2 mr-4 text-[16px] text-secondary" />
          }
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('billing.city')}
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
            <Location4Icon className="ml-2 mr-4 text-[16px] text-secondary" />
          }
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        label={t('fields.phone.label')}
        name="phone"
        validateDebounce={1000}
      >
        <Input
          prefix={
            <PhoneOutlined className="ml-2 mr-4 text-[16px] text-secondary" />
          }
          size="large"
          placeholder={t('fields.phone.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item
        label={t('fields.rating.label')}
        name="rating"
        validateDebounce={1000}
      >
        <Input
          prefix={
            <StarOutlined className="ml-2 mr-4 text-[16px] text-secondary" />
          }
          size="large"
          placeholder={t('fields.icon.select')}
          className="select-shadow"
        />
      </Form.Item>

      <Form.Item
        validateDebounce={1000}
        label={t('fields.status.label')}
        name="status"
      >
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          prefix={
            <FileVerifiedIcon className="ml-2 mr-4 text-[16px] text-secondary" />
          }
          size="large"
          placeholder={t('fields.status.placeholder')}
          className="select-shadow"
          // value={gender}
          allowClear={true}
        />
      </Form.Item>
    </Form>
  )
}

export default PlacementsFilters
