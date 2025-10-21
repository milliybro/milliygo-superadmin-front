import { DatePicker, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import HotelIcon from '@/components/icons/hotel'
import Calendar3Icon from '@/components/icons/calendar-3'
import UserMultipleIcon from '@/components/icons/user-multiple'

const ComplaintsFilters = () => {
  const { t } = useTranslation()

  return (
    <Form layout="vertical" className="grid grid-cols-3 gap-4">
      <Form.Item label={t('fields.hotel-search.label')}>
        <Input
          prefix={<HotelIcon className="ml-2 mr-4 text-base text-secondary" />}
          size="large"
          placeholder={t('fields.hotel-search.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item label={t('fields.user-fullname.label')}>
        <Input
          prefix={
            <UserMultipleIcon className="ml-2 mr-4 text-base text-secondary" />
          }
          size="large"
          placeholder={t('fields.user-fullname.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item label={t('fields.date.label')}>
        <DatePicker
          suffixIcon={null}
          className="select-shadow h-[47px] w-full"
          size="large"
          placeholder={t('fields.date.placeholder')}
          prefix={
            <Calendar3Icon className="ml-2 mr-4 text-base text-secondary" />
          }
        />
      </Form.Item>
    </Form>
  )
}

export default ComplaintsFilters
