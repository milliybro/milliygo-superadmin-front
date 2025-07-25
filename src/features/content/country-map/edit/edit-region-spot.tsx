import ArrowDownIcon from '@/components/icons/arrow-down'
import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, Select, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router'
import { getTopDestinations } from '../../api'
import useCountryMapContext from '../hooks/use-country-map'
import CountryMapSVG from '../map/country-map-svg'

export default function EditRegionSpot() {
  const { region } = useParams()
  const { t } = useTranslation()
  const [form] = Form.useForm<{ point_title: string; destination: number }>()
  const pointTitle = Form.useWatch('point_title', form)
  const [searchParams] = useSearchParams()
  const {
    updateMapPointMutation: { mutate, isPending },
    points,
  } = useCountryMapContext()
  const pointId = +searchParams.get('id')!

  const { data } = useQuery({
    queryKey: ['destinations', region],
    queryFn: () => getTopDestinations({ region }),
    enabled: true,
    select: data =>
      data?.results?.map(item => ({ label: item?.title, value: item?.id })) ||
      [],
  })

  useEffect(() => {
    const editingPoint = points?.results?.find(point => point.id === pointId)

    if (points) {
      form.setFieldsValue({
        point_title: editingPoint?.front_data?.point_title || '',
        destination: editingPoint?.top_destination?.id || undefined,
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
        isEdit={true}
        editingPoint={editingPoint}
      />
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

        <Button type="primary" htmlType="submit" loading={isPending}>
          Сохранить точку
        </Button>
      </Form>
    </div>
  )
}
