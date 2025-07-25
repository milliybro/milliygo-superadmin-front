import ArrowDownIcon from '@/components/icons/arrow-down'
import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { getTopDestinations } from '../../api'
import CountryMapSVG from '../../components/map/country-map-svg'
import useCountryMapContext from '../hooks/use-country-map'

export default function CreateRegionSpot() {
  const { region } = useParams()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const pointTitle = Form.useWatch('point_title', form)
  const {
    createMapPointMutation: { mutate },
  } = useCountryMapContext()

  const { data } = useQuery({
    queryKey: ['destinations', region],
    queryFn: () => getTopDestinations({ region }),
    enabled: true,
    select: data =>
      data?.results?.map(item => ({ label: item?.title, value: item?.id })) ||
      [],
  })

  return (
    <div className="flex flex-col">
      <Typography.Title level={3} className="text-2xl font-bold">
        {t('common.map-title')}
      </Typography.Title>
      <CountryMapSVG pointTitle={pointTitle} isAddingNew={true} />
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
            options={data}
            placeholder="Выберите направление соответствующее карте"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Сохранить точку
        </Button>
      </Form>
    </div>
  )
}
