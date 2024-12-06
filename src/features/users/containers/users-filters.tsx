import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserStatusIcon from '@/components/icons/user-status'
import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'
import TimeManagementIcon from '@/components/icons/time-management'

const UsersFilters = () => {
  const { t } = useTranslation()

  return (
    <Form layout="vertical" className="grid grid-cols-4 gap-4">
      <Form.Item label={t('fields.search-user.label')}>
        <Input
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.search-user.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item label={t('fields.gender.label')}>
        <CSelect
          options={[{ label: '123', value: 123 }]}
          prefix={
            <UserMultipleIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.gender.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item label={t('fields.role.label')}>
        <CSelect
          options={[{ label: '123', value: 123 }]}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.role.placeholder')}
          prefix={
            <TimeManagementIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
        />
      </Form.Item>
      <Form.Item label={t('fields.status.label')}>
        <CSelect
          options={[{ label: '123', value: 123 }]}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.status.placeholder')}
          prefix={
            <UserStatusIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
        />
      </Form.Item>
    </Form>
  )
}

export default UsersFilters
