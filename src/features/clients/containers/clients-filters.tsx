import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserStatusIcon from '@/components/icons/user-status'
import UserMultipleIcon from '@/components/icons/user-multiple'
import UserSquareIcon from '@/components/icons/user-square'
import Location4Icon from '@/components/icons/location-4'
import { getCountries } from '../api'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letter'
import { useQuery } from '@tanstack/react-query'

interface ClientsFiltersProps {
  setSearchTerm: (value: string) => void
  searchTerm: string
  setGender: (value: string) => void
  gender: string
  setSelectedCountry: (value: string) => void
  setIsActive: (value: boolean) => void
}

const ClientsFilters: React.FC<ClientsFiltersProps> = ({
  setSearchTerm,
  // searchTerm,
  setGender,
  setSelectedCountry,
  // gender,
  setIsActive
}) => {
  const { t } = useTranslation()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const handleGenderChange = (value: any) => {
    setGender(value)
  }
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await getCountries({
        page_size: 250,
      })
      return res
    },
    // keepPreviousData: true,
  })
  const INITIAL_COUNTRIES = [67, 68, 67, 70, 14, 67, 21]

  const countryOptions = Array.isArray(countries?.results)
    ? countries.results
        .map(country => ({
          index: country.id,
          value: country.id,
          label: capitalizeFirstLetters(country?.name),
        }))
        .sort((a, b) => {
          const indexA = INITIAL_COUNTRIES.indexOf(a.value)
          const indexB = INITIAL_COUNTRIES.indexOf(b.value)

          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB
          }
          if (indexA !== -1) return -1
          if (indexB !== -1) return 1

          return a.label.localeCompare(b.label)
        })
    : []

  const countryHandleSearch = (value: string) => {
    setSelectedCountry(value)
  }
  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
  //   if (scrollHeight - scrollTop === clientHeight) {
  //     setPage(prev => prev + 1)
  //   }
  // }
  const handleActiveChange = (value: any) => {
    setIsActive(value)
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
          allowClear
          options={countryOptions}
          suffixIcon={null}
          className="w-full select-shadow h-[47px]"
          size="large"
          placeholder={t('fields.citizenship.placeholder')}
          prefix={
            <Location4Icon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          // onPopupScroll={handleScroll}
          onSearch={countryHandleSearch}
          onChange={value => {
            console.log(value)
            setSelectedCountry(value)
            if (!value) {
              setSelectedCountry('')
            }
          }}
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

export default ClientsFilters
