import { Button, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { Dispatch, SetStateAction } from 'react'
import CSelect from '@/components/ui/select'
import { FileTextOutlined, PrinterOutlined } from '@ant-design/icons'

type ReportsFiltersProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const ReportsFilters = ({ setCurrentPage }: ReportsFiltersProps) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleValuesChange = (_: any, allValues: any) => {
    const newParams = searchParams

    Object.keys(allValues).forEach(key => {
      const value = allValues[key]

      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }

      setCurrentPage(1)
    })

    setSearchParams(newParams)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      className="flex items-center gap-4"
      onValuesChange={handleValuesChange}
    >
      <Form.Item name="year" className="flex-1">
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          size="large"
          placeholder={t('billing.reports.choose-year')}
          className="select-shadow font-medium"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item name="month" className="flex-1">
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          size="large"
          placeholder={t('billing.reports.choose-month')}
          className="select-shadow font-medium"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item name="accrualType" className="flex-1">
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          size="large"
          placeholder={t('billing.accrual-type')}
          className="select-shadow font-medium"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item name="region" className="flex-1">
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          size="large"
          placeholder={t('billing.reports.choose-region')}
          className="select-shadow font-medium"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item name="hotel" className="flex-1">
        <CSelect
          options={[
            { label: t('common.men'), value: 'male' },
            { label: t('common.women'), value: 'female' },
          ]}
          size="large"
          placeholder={t('billing.reports.choose-hotel')}
          className="select-shadow font-medium"
          allowClear={true}
        />
      </Form.Item>
      <Button
        icon={
          <div className="flex items-center justify-center">
            <FileTextOutlined className="text-[20px]" />
          </div>
        }
        size="large"
      />
      <Button
        icon={
          <div className="flex items-center justify-center">
            <PrinterOutlined className="text-[20px]" />
          </div>
        }
        size="large"
      />
    </Form>
  )
}

export default ReportsFilters
