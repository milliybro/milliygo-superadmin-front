import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import DeleteModal from '../../../components/delete-modal'
import CountryMapSVG from '../../components/map/country-map-svg'
import RegionSpotsTable from '../../components/region-spots-table'
import useCountryMapContext from '../../hooks/use-country-map'

export default function RegionSpots() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const navigate = useNavigate()
  const {
    deleteMapPointMutation: { mutate, isPending },
    deletingId,
    setDeletingId,
    regionData,
  } = useCountryMapContext()

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
      <RegionSpotsTable setDeleteOpen={setDeletingId} />
      <DeleteModal
        open={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Удалить точку с карты?"
        description="Подтвердите, что вы действительно хотите удалить данную точку с карты?"
        onDelete={() => {
          mutate(deletingId!)
        }}
        isLoading={isPending}
      />
    </div>
  )
}
