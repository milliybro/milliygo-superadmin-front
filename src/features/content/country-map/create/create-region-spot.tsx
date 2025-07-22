import ArrowDownIcon from '@/components/icons/arrow-down'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { useQuery } from '@tanstack/react-query'
import { Form, Input, Select, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { getTopDestinations } from '../../api'
import CountryMapSVG from '../../components/map/country-map-svg'

export default function CreateRegionSpot() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const { region } = useParams()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const pointTitle = Form.useWatch('point_title', form)

  const { data } = useQuery({
    queryKey: ['destinations', region],
    queryFn: () => getTopDestinations({ region }),
    enabled: true,
    select: data =>
      data?.results?.map(item => ({ label: item?.title, value: item?.id })) ||
      [],
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/country-map' },
      {
        title: 'Samarqand viloyati',
        href: `/content/country-map/${region}`,
      },
      {
        title: 'Создать точку на карте',
      },
    ])
  }, [])

  return (
    <div className="flex flex-col">
      <Typography.Title level={3} className="text-2xl font-bold">
        {t('common.map-title')}
      </Typography.Title>
      <CountryMapSVG pointTitle={pointTitle} />
      <Form layout="vertical" className="mt-10 space-y-5" form={form}>
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
      </Form>
    </div>
  )
}
