import ArrowDownIcon from '@/components/icons/arrow-down'
import { Button, Form, Input, Select, Switch, Tag, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import useCountryMapContext from '../../hooks/use-country-map'
import CountryMapSVG from '../../components/map/country-map-svg'

export default function EditRegionSpot() {
  const { t } = useTranslation()
  const [form] = Form.useForm<{
    point_title: string
    destination: number
    is_active: boolean
  }>()
  const status = Form.useWatch('is_active', form)
  const pointTitle = Form.useWatch('point_title', form)
  const [searchParams] = useSearchParams()
  const {
    updateMapPointMutation: { mutate, isPending },
    topDestinationOptions,
    pointsQuery: { data: points },
  } = useCountryMapContext()
  const pointId = +searchParams.get('id')!

  useEffect(() => {
    const editingPoint = points?.results?.find(point => point.id === pointId)

    if (points) {
      form.setFieldsValue({
        point_title: editingPoint?.front_data?.point_title || '',
        destination: editingPoint?.top_destination?.id || undefined,
        is_active: editingPoint?.is_active ?? true,
      })
    }
  }, [points])

  const editingPoint = points?.results?.find(point => point.id === +pointId)

  return (
    <div className="flex flex-col">
      <Typography.Title level={3} className="text-2xl font-bold">
        {t('common.map-title')}
      </Typography.Title>
      <CountryMapSVG
        pointTitle={pointTitle}
        isEdit
        isCreating={false}
        editingPoint={editingPoint}
      />
      <Form
        layout="vertical"
        className="mt-10 space-y-5"
        form={form}
        onFinish={mutate}
      >
        <Form.Item label={t('fields.map-point.label')} name="point_title">
          <Input
            size="large"
            className="w-full"
            placeholder={t('fields.map-point.placeholder')}
          />
        </Form.Item>
        <Form.Item label={t('fields.destination.label')} name="destination">
          <Select
            size="large"
            suffixIcon={<ArrowDownIcon className="text-xl text-inherit" />}
            className="w-full"
            options={topDestinationOptions}
            placeholder={t('fields.destination.placeholder')}
          />
        </Form.Item>

        <div className="flex items-end gap-5">
          <Form.Item label={t('fields.status.label')} name="is_active">
            <Switch />
          </Form.Item>
          <Tag color={status ? 'green' : 'red'} className="px-2 py-2 text-sm">
            {status ? t('common.active') : t('common.inactive')}
          </Tag>
        </div>

        <Button type="primary" htmlType="submit" loading={isPending}>
          {t('content.country-map.save-point')}
        </Button>
      </Form>
    </div>
  )
}
