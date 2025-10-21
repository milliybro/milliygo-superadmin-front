import { Form, Input } from 'antd'

import { useTranslation } from 'react-i18next'

import UserSquareIcon from '@/components/icons/user-square'
import { useSearchParams } from 'react-router'

const AccessRoleFilters = () => {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('roles_search') || null

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
      className="grid grid-cols-2 gap-4"
      onValuesChange={handleValuesChange}
    >
      <Form.Item label={t('fields.role-search.label')} name="roles_search">
        <Input
          defaultValue={search || ''}
          prefix={
            <UserSquareIcon className="ml-2 mr-4 text-base text-secondary" />
          }
          size="large"
          placeholder={t('fields.role-search.placeholder')}
          className="select-shadow"
        />
      </Form.Item>

      {/* <Form.Item label={t('fields.status.label')}>
        <CSelect
          options={[{ label: '123', value: 123 }]}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.status.placeholder')}
          prefix={
            <UserStatusIcon className="text-base text-secondary ml-2 mr-4" />
          }
        />
      </Form.Item> */}
    </Form>
  )
}

export default AccessRoleFilters
