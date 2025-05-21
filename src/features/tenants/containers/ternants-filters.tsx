import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import HotelIcon from '@/components/icons/hotel'
import UserStatusIcon from '@/components/icons/user-status'
// import UserMultipleIcon from '@/components/icons/user-multiple'
import TimeManagementIcon from '@/components/icons/time-management'
import { useSearchParams } from 'react-router'
import { useEffect } from 'react'

const TernantsFilters = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('hotel_search') || null
  const gender = searchParams.get('gender') || null
  const role = searchParams.get('role') || null
  const status = searchParams.get('status') || null

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        search: search,
        role: role,
        gender: gender,
        status: status,
      })
    }
  }, [form])

  const handleValuesChange = (_: any, allValues: any) => {
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

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-3 gap-4"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label={t('fields.hotel-search.label')}
        name="schema_name__icontains"
      >
        <Input
          prefix={
            <HotelIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.hotel-search.placeholder')}
          className="select-shadow"
          allowClear
        />
      </Form.Item>
      <Form.Item label={t('fields.login.label')} name="username__icontains">
        <Input
          prefix={
            <TimeManagementIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.login.validation-message-required')}
          className="select-shadow"
          allowClear
        />
      </Form.Item>
      {/* <Form.Item label={t('fields.contact-person.label')} name="contact_person">
        <Input
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.contact-person.placeholder')}
          prefix={
            <UserMultipleIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
        />
      </Form.Item> */}
      <Form.Item label={t('fields.status.label')} name="is_active">
        <CSelect
          options={[
            { label: t('common.active'), value: '1' },
            { label: t('common.inactive'), value: '0' },
          ]}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.status.placeholder')}
          prefix={
            <UserStatusIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          allowClear
        />
      </Form.Item>
    </Form>
  )
}

export default TernantsFilters
