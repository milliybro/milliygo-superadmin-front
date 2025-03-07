import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserStatusIcon from '@/components/icons/user-status'
import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'
import TimeManagementIcon from '@/components/icons/time-management'
import { useQuery } from '@tanstack/react-query'
import { getUserRoles } from '../api'

interface UsersFiltersProps {
  setSearchTerm: (value: string) => void
  searchTerm: string
  setGender: (value: string) => void
  gender: string
  role: string
  setRole: (value: string) => void
  isActive: any
  setIsActive: any
}

const UsersFilters: React.FC<UsersFiltersProps> = ({
  setSearchTerm,
  // searchTerm,
  setGender,
  // gender,
  // role,
  setRole,
  // isActive,
  setIsActive,
}) => {
  const { t } = useTranslation()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const handleGenderChange = (value: any) => {
    setGender(value)
  }
  const handleRoleChange = (value: any) => {
    setRole(value)
  }
  const handleActiveChange = (value: any) => {
    setIsActive(value)
  }

  const { data: roles, isLoading } = useQuery({
    queryKey: ['users-roles'],
    queryFn: async () => {
      const res = await getUserRoles()
      return res
    },
    // keepPreviousData: true,
  })

  console.log(isLoading);
  

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
          onChange={handleSearch}
        />
      </Form.Item>
      <Form.Item label={t('fields.gender.label')}>
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
          onChange={handleGenderChange}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item label={t('fields.role.label')}>
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
          onChange={handleRoleChange}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item label={t('fields.status.label')}>
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
          onChange={handleActiveChange}
          allowClear={true}
        />
      </Form.Item>
    </Form>
  )
}

export default UsersFilters
