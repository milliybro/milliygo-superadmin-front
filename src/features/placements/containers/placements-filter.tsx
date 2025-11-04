import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import FileVerifiedIcon from '@/components/icons/file-verified-icon'
import HotelIcon from '@/components/icons/hotel'
import LocationIcon from '@/components/icons/location'
import PhoneIcon from '@/components/icons/phone-icon'
import StarIcon2 from '@/components/icons/star-icon-2'
import { getRegions } from '@/features/content/api'
import { getDistricts } from '@/features/tourists/api'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

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
    const newParams = new URLSearchParams(searchParams)

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

    // 🔹 Har safar filter o‘zgarsa pagination 1-sahifadan boshlansin
    newParams.set('page', '1')

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
      className="mb-6 grid w-full grid-cols-6 items-end gap-3 2xl:gap-8 [&_.ant-form-item-label]:text-sm [&_.ant-form-item-label]:font-medium"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label={t('hotels-page.name.title')}
        name="search"
        validateDebounce={1000}
      >
        <Input
          prefix={<HotelIcon className="mr-4 text-base text-[#115E59]" />}
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
          className="h-[47px] w-full [&_.ant-select-selector]:shadow-sm"
          size="large"
          placeholder={t('fields.icon.select')}
          prefix={<LocationIcon className="mr-4 text-base text-[#115E59]" />}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('billing.district')}
        name="district"
      >
        <CSelect
          options={districts?.results.map(district => ({
            label: district.name,
            value: district.id,
          }))}
          className="h-[47px] w-full [&_.ant-select-selector]:shadow-sm"
          size="large"
          placeholder={t('fields.icon.select')}
          prefix={<LocationIcon className="mr-4 text-base text-[#115E59]" />}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        label={t('fields.phone.label')}
        name="phone"
        validateDebounce={1000}
      >
        <Input
          prefix={<PhoneIcon className="mr-4 text-base text-[#115E59]" />}
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
          prefix={<StarIcon2 className="mr-4 text-base text-[#115E59]" />}
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
            { label: t('common.active'), value: 'true' },
            { label: t('common.inactive'), value: 'false' },
          ]}
          prefix={
            <FileVerifiedIcon className="mr-4 text-base text-[#115E59]" />
          }
          size="large"
          placeholder={t('fields.status.placeholder')}
          className="[&_.ant-select-selector]:shadow-sm [&_.ant-select-selector]:shadow-black/5"
          allowClear={true}
        />
      </Form.Item>
    </Form>
  )
}

export default PlacementsFilters
