import { Form, Input } from 'antd'

import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserStatusIcon from '@/components/icons/user-status'
import UserSquareIcon from '@/components/icons/user-square'

const AccessRoleFilters = () => {
  const { t } = useTranslation()

  return (
    <Form layout="vertical" className="grid grid-cols-2 gap-4">
      <Form.Item label={t('fields.role-search.label')}>
        <Input
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.role-search.placeholder')}
          className="select-shadow"
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

export default AccessRoleFilters
