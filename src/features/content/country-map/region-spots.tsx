import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getRegion } from '../api'
import DeleteModal from '../components/delete-modal'
import RegionSpotsTable from './list/region-spots-table'
import CountryMapSVG from './map/country-map-svg'

export default function RegionSpots() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const navigate = useNavigate()

  const { region } = useParams()

  const { data: regionData } = useQuery({
    queryKey: ['region', region],
    queryFn: () => getRegion(+region!),
    throwOnError: () => {
      navigate('/not-found')
      return false
    },
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/country-map' },
      {
        title: regionData?.name || ' ',
      },
    ])
  }, [regionData])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-2xl font-semibold">
          {regionData?.name || 'Регион'}
        </Typography.Title>
        <Button type="primary" onClick={() => navigate('create')}>
          <PlusOutlined />
          Добавить
        </Button>
      </div>
      <CountryMapSVG isEdit={false} />
      <RegionSpotsTable setDeleteOpen={setDeleteOpen} />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Удалить точку с карты?"
        description="Подтвердите, что вы действительно хотите удалить данную точку с карты?"
        // onDelete={() => mutate(+region!)}
        // isLoading={isPending}
      />
    </div>
  )
}
