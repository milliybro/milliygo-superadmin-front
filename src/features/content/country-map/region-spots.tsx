import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useEffect, useState } from 'react'
import DeleteModal from '../components/delete-modal'
import TopDestinationsTable from '../top-destinations/list/top-destination-table'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { useNavigate } from 'react-router'

export default function RegionSpots() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const navigate = useNavigate()

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/country-map' },
      {
        title: 'Samarqand viloyati',
      },
    ])
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-2xl font-semibold">
          Samarqand viloyati
        </Typography.Title>
        <Button type="primary" onClick={() => navigate('create')}>
          <PlusOutlined />
          Добавить
        </Button>
      </div>
      <TopDestinationsTable setDeleteOpen={setDeleteOpen} />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Удалить точку с карты?"
        description="Подтвердите, что вы действительно хотите удалить данную точку с карты?"
      />
    </div>
  )
}
