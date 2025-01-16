import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserStatusIcon from '@/components/icons/user-status'
import UserMultipleIcon from '@/components/icons/user-multiple'
import UserSquareIcon from '@/components/icons/user-square'
import Location4Icon from '@/components/icons/location-4'

interface ClientsFiltersProps {
  setSearchTerm: (value: string) => void
  searchTerm: string
  setGender: (value: string) => void
  gender: string
}

const ClientsFilters: React.FC<ClientsFiltersProps> = ({
  setSearchTerm,
  searchTerm,
  setGender,
  gender,
}) => {
  const { t } = useTranslation()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const handleGenderChange = (value: any) => {
    setGender(value)
  }

  return (
    <Form layout="vertical" className="grid grid-cols-4 gap-4">
      <Form.Item label={t('fields.client-search.label')}>
        <Input
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('fields.client-search.placeholder')}
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
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.gender.placeholder')}
          prefix={
            <UserMultipleIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          onChange={handleGenderChange}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item label={t('fields.citizenship.label')}>
        <CSelect
          options={[{ label: '123', value: 123 }]}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.citizenship.placeholder')}
          prefix={
            <Location4Icon className="text-[16px] text-secondary ml-2 mr-4" />
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

export default ClientsFilters
