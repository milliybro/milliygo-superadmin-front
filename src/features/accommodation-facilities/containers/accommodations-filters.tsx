import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import CSelect from '@/components/ui/select'

import UserSquareIcon from '@/components/icons/user-square'
import UserMultipleIcon from '@/components/icons/user-multiple'
import { useSearchParams } from 'react-router'
import { useEffect, useMemo } from 'react'
import debounce from 'lodash/debounce'

const AccommodationsFilters = () => {
  const { t } = useTranslation()

  const [form] = Form.useForm()

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || null
  const status = searchParams.get('status') || null

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

  const debouncedValuesChangeHandler = useMemo(
    () => debounce(handleValuesChange, 500),
    [],
  )

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        search: search,
        status: status,
      })
    }

    return () => {
      debouncedValuesChangeHandler.cancel()
    }
  }, [form])

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-2 gap-4"
      form={form}
      onValuesChange={debouncedValuesChangeHandler}
    >
      <Form.Item label={t('hotels-page.name.title')} name="search">
        <Input
          prefix={
            <UserSquareIcon className="text-[16px] text-secondary ml-2 mr-4" />
          }
          size="large"
          placeholder={t('hotels-page.name.placeholder')}
          className="select-shadow"
        />
      </Form.Item>
      <Form.Item label={t('accommodations-page.filter.status')} name="status">
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
