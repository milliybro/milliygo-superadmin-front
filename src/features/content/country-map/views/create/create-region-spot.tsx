import ArrowDownIcon from '@/components/icons/arrow-down'
import { Button, Form, Input, Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import CountryMapSVG from '../../components/map/country-map-svg'
import useCountryMapContext from '../../hooks/use-country-map'

export default function CreateRegionSpot() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const pointTitle = Form.useWatch('point_title', form)
  const {
    createMapPointMutation: { mutate, isPending },
    topDestinationOptions,
  } = useCountryMapContext()

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
      >
        <Form.Item label="Название на карте" name="point_title">
          <Input
            size="large"
            className="w-full"
            placeholder="Введите название которое будет отображаться на карте"
          />
        </Form.Item>
        <Form.Item label="Направление" name="destination">
          <Select
            size="large"
            suffixIcon={<ArrowDownIcon className="text-xl text-inherit" />}
            className="w-full"
            options={topDestinationOptions}
            placeholder="Выберите направление соответствующее карте"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending}>
          Сохранить точку
        </Button>
      </Form>
    </div>
  )
}
