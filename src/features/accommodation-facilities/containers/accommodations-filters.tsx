import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'

const AccommodationsFilters = () => {
  const { t } = useTranslation()

  return (
    <Form layout="vertical" className="grid grid-cols-2 gap-4">
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
      <Form.Item label={t('accommodations-page.filter.status')}>
        <CSelect
          options={[
            { label: t('common.active'), value: 'male' },
            { label: t('common.inactive'), value: 'female' },
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
