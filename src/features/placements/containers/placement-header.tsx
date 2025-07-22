import { Form } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import { useSearchParams } from 'react-router'
import FileVerifiedIcon from '@/components/icons/file-verified-icon'

const PlacementsHeader = () => {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()

  const handleValuesChange = (_: any, allValues: any) => {
    const newParams = new URLSearchParams()

    Object.keys(allValues).forEach(key => {
      if (allValues[key]) {
        newParams.set(key, allValues[key])
        newParams.set('tab', searchParams.get('tab') ?? '1')
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }
  return (
    <div className="flex items-start justify-between">
      <div className="text-[24px] text-primary-dark font-semibold">
        {t('routes.placement-funds')}
      </div>
      <Form layout="vertical" className="" onValuesChange={handleValuesChange}>
        <Form.Item name="status" className="w-[180px]">
          <CSelect
            options={[
              { label: t('common.active'), value: '1' },
              { label: t('common.inactive'), value: '0' },
            ]}
            suffixIcon={null}
            className="w-full select-shadow h-[47px] w-[250px]"
            size="large"
            placeholder={t('fields.status.placeholder')}
            prefix={
              <FileVerifiedIcon className="text-[16px] text-secondary ml-2 mr-6" />
            }
            allowClear={true}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default PlacementsHeader
