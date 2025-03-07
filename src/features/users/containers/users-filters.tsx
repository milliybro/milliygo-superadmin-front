import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserStatusIcon from '@/components/icons/user-status'
import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'
import TimeManagementIcon from '@/components/icons/time-management'
import { useQuery } from '@tanstack/react-query'
import { getUserRoles } from '../api'
import { useSearchParams } from 'react-router'
import { useEffect } from 'react'

const UsersFilters = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || null
  const gender = searchParams.get('gender') || null
  const role = searchParams.get('role') || null
  const status = searchParams.get('status') || null

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const newParams = new URLSearchParams()
    console.log(changedValues)

    Object.keys(allValues).forEach(key => {
      if (allValues[key]) {
        newParams.set(key, allValues[key])
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }

  const { data: roles } = useQuery({
    queryKey: ['users-roles'],
    queryFn: async () => {
      const res = await getUserRoles()
      return res
    },
    // keepPreviousData: true,
  })

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

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-4 gap-4"
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label={t('fields.search-user.label')}
        name="search"
        validateDebounce={1000}
      >
        <Input
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.search-user.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('fields.gender.label')}
        name="gender"
      >
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          prefix={
            <UserMultipleIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.gender.placeholder')}
          className="select-shadow"
          // value={gender}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        validateDebounce={1000}
        label={t('fields.role.label')}
        name="role"
      >
        <CSelect
          options={roles?.results.map(role => ({
            label: t(`common.${role.name}`),
            value: role.name,
          }))}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.role.placeholder')}
          prefix={
            <TimeManagementIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          // value={role}
          allowClear={true}
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

export default UsersFilters
