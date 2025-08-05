import ArrowDownIcon from '@/components/icons/arrow-down'
import { Button, Form, Input, Select, Switch, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CountryMapSVG from '../../components/map/country-map-svg'
import useCountryMapContext from '../../hooks/use-country-map'
import { useEffect } from 'react'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

export default function CreateRegionSpot() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const pointTitle = Form.useWatch('point_title', form)
  const {
    createMapPointMutation: { mutate, isPending },
    topDestinationOptions,
    regionData,
  } = useCountryMapContext()
  const { setBreadCrumbs } = useBreadCrumbsStore()

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content/country-map' },
      { title: t('content.country-map.title'), href: '/content/country-map/' },
      {
        title: regionData?.name || ' ',
      },
      {
        title: t('content.country-map.create-point'),
      },
    ])
  }, [regionData])

  return (
    <div className="flex flex-col">
      <Typography.Title level={3} className="text-2xl font-bold">
        {t('common.map-title')}
      </Typography.Title>
      <CountryMapSVG pointTitle={pointTitle} isEdit={false} isCreating />
      <Form
        layout="vertical"
        className="mt-10 space-y-5"
        form={form}
        onFinish={mutate}
        initialValues={{ is_active: true }}
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

        <Form.Item label={t('fields.status.label')} name="is_active">
          <Switch />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending}>
          {t('content.country-map.save-point')}
        </Button>
      </Form>
    </div>
  )
}
