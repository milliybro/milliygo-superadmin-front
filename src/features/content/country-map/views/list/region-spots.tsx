import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import DeleteModal from '../../../components/delete-modal'
import CountryMapSVG from '../../components/map/country-map-svg'
import RegionSpotsTable from '../../components/region-spots-table'
import useCountryMapContext from '../../hooks/use-country-map'
import { useTranslation } from 'react-i18next'

export default function RegionSpots() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const navigate = useNavigate()
  const {
    deleteMapPointMutation: { mutate, isPending },
    deletingId,
    setDeletingId,
    regionData,
  } = useCountryMapContext()
  const { t } = useTranslation()

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content/country-map' },
      {
        title: regionData?.name || ' ',
      },
    ])
  }, [regionData])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-2xl font-semibold">
          {regionData?.name || t('billing.region')}
        </Typography.Title>
        <Button type="primary" onClick={() => navigate('create')}>
          <PlusOutlined />
          {t('services-page.add-user')}
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
