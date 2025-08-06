import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import {
  Button,
  Image,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import useCountryMapContext from '../hooks/use-country-map'

interface IProps {
  setDeleteOpen: Dispatch<SetStateAction<number | null>>
}

function RegionSpotsTable({ setDeleteOpen }: IProps) {
  const navigate = useNavigate()
  const { pointsQuery } = useCountryMapContext()
  const { t } = useTranslation()
  const columns: TableProps['columns'] = [
    {
      title: t('fields.map-point.label'),
      key: 'name',
      dataIndex: 'name',
      className: 'w-1/2',
      render: value => <div className="font-semibold">{value}</div>,
    },
    {
      title: t('content.country-map.point-destination'),
      key: 'description',
      dataIndex: 'description',
      className: 'w-1/2',
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="size-[52px] shrink-0 overflow-hidden rounded-2xl bg-secondary">
            <Image
              src={record?.image}
              alt={record?.destination}
              className="h-full w-full object-cover"
              rootClassName="h-full w-full"
            />
          </div>
          <Typography.Text className="block w-max text-sm font-medium">
            {record?.destination}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: t('fields.status.label'),
      key: 'status',
      dataIndex: 'status',
      width: 0,
      render: value => (
        <Tag color={value ? 'green' : 'red'}>
          {value ? t('common.active') : t('common.inactive')}
        </Tag>
      ),
    },
    {
      title: t('common.action'),
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Tooltip title={t('common.edit')}>
            <Button
              type="link"
              className="p-0"
              onClick={() => navigate(`edit/${record.id}`)}
            >
              <EditIcon className="text-xl" />
            </Button>
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <Button
              type="link"
              danger
              onClick={() => setDeleteOpen(record?.id || record?.key || null)}
              className="p-0"
            >
              <DeleteIcon className="text-xl" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

  const data = useMemo(() => {
    return (
      pointsQuery?.data?.results?.map(item => ({
        key: item.id,
        id: item.id,
        name: item?.front_data?.point_title,
        destination: item?.top_destination?.title,
        image:
          item?.top_destination?.images?.find(img => img.is_main)?.file_path ||
          item?.top_destination?.images?.[0]?.file_path ||
          '',
        status: item?.is_active,
      })) || []
    )
  }, [pointsQuery?.data])

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      loading={pointsQuery?.isFetching}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
        position: ['bottomCenter'],
      }}
      className="w-ful overflow-auto"
    />
  )
}

export default RegionSpotsTable
