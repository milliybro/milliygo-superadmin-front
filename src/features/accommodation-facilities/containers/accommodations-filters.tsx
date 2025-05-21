import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'
import { useSearchParams } from 'react-router'

const AccommodationsFilters = () => {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams)

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
  
  return (
    <Form onValuesChange={handleValuesChange} layout="vertical" className="grid grid-cols-2 gap-4">
      <Form.Item label={t('accommodations-page.filter.creator')}>
        <Input
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('accommodations-page.filter.full-name')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item name="status" label={t('accommodations-page.filter.status')}>
        <CSelect
          options={[
            { label: t('common.active'), value: 'true' },
            { label: t('common.inactive'), value: 'false' },
          ]}
          prefix={
            <UserMultipleIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('accommodations-page.filter.status-placeholder')}
          className="select-shadow"
          // value={gender}
          allowClear={true}
        />
      </Form.Item>
    </Form>
  )
}

export default AccommodationsFilters
