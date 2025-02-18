import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import HotelIcon from '@/components/icons/hotel'
import UserStatusIcon from '@/components/icons/user-status'
import UserMultipleIcon from '@/components/icons/user-multiple'
import TimeManagementIcon from '@/components/icons/time-management'
import { useSearchParams } from 'react-router'

const HotelsFilters = () => {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams)

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const newParams = new URLSearchParams()
    console.log(changedValues)

    Object.keys(allValues).forEach(key => {
      if (allValues[key]) {
        newParams.set(key, allValues[key])
      }
    })

    setSearchParams(newParams)
  }
  return (
    <Form
      layout="vertical"
      className="grid grid-cols-4 gap-4"
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        validateDebounce={1000}
        label={t('fields.hotel-search.label')}
        name="hotel_search"
      >
        <Input
          prefix={
            <HotelIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.hotel-search.placeholder')}
          className="select-shadow"
        />
      </Form.Item>

      <Form.Item
        validateDebounce={1000}
        label={t('fields.login.label')}
        name="login"
      >
        <Input
          prefix={
            <TimeManagementIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.login.validation-message-required')}
          className="select-shadow"
        />
      </Form.Item>

      <Form.Item
        validateDebounce={1000}
        label={t('fields.contact-person.label')}
        name="contact_person"
      >
        <Input
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.contact-person.placeholder')}
          prefix={
            <UserMultipleIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
        />
      </Form.Item>

      <Form.Item label={t('fields.status.label')} name="status">
        <CSelect
          options={[
            { label: t('common.active'), value: 1 },
            { label: t('common.inactive'), value: 0 },
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

export default HotelsFilters
