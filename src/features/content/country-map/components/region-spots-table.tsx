import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { Button, Switch, Table, TableProps, Tooltip, Typography } from 'antd'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useNavigate } from 'react-router'
import useCountryMapContext from '../hooks/use-country-map'

interface IProps {
  setDeleteOpen: Dispatch<SetStateAction<number | null>>
}

function RegionSpotsTable({ setDeleteOpen }: IProps) {
  const navigate = useNavigate()
  const { pointsQuery } = useCountryMapContext()
  const columns: TableProps['columns'] = [
    {
      title: 'Название на карте',
      key: 'name',
      dataIndex: 'name',
      className: 'w-1/2',
      render: value => <div className="font-semibold">{value}</div>,
    },
    {
      title: 'Направление точки',
      key: 'description',
      dataIndex: 'description',
      className: 'w-1/2',
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="size-[52px] shrink-0 rounded-2xl bg-secondary"></div>
          <Typography.Text className="block w-max text-sm font-medium">
            {record?.destination}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      width: 0,
      render: (_, record) => <Switch checked={record?.status} />,
    },
    {
      title: 'Действие',
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Tooltip title="Редактировать">
            <Button
              type="link"
              className="p-0"
              onClick={() => navigate(`edit?id=${record.id}`)}
            >
              <EditIcon className="text-xl" />
            </Button>
          </Tooltip>
          <Tooltip title="Удалить">
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
