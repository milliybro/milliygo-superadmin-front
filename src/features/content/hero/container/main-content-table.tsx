import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { useQuery } from '@tanstack/react-query'
import { Button, Switch, Table, TableProps } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { getBackgrounds } from '../api'
import VideoThumbnail from '@/components/shared/video-thumbnail'

interface IProps {
  setDeleteOpen: Dispatch<SetStateAction<boolean>>
}

function MainContentTable({ setDeleteOpen }: IProps) {
  const columns: TableProps['columns'] = [
    {
      title: 'Картина',
      key: 'image',
      dataIndex: 'image',
      className: 'w-1/2',
      render: value => (
        <div className="size-[52px] overflow-hidden rounded-2xl bg-secondary-light">
          <VideoThumbnail videoSrc={value} />
        </div>
      ),
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      className: 'w-1/2',
      render: () => <Switch />,
    },
    {
      title: 'Действие',
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: () => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Button type="link">
            <EditIcon className="text-xl" />
            Редактировать
          </Button>
          <Button type="link" danger onClick={() => setDeleteOpen(true)}>
            <DeleteIcon className="text-xl" />
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const { data } = useQuery({
    queryKey: ['backgrounds'],
    queryFn: getBackgrounds,
    enabled: true,
    select: data =>
      data.results?.map(item => ({
        key: item?.id,
        image: item?.video,
        status: item?.is_active,
      })) || [],
  })

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
    />
  )
}

export default MainContentTable
