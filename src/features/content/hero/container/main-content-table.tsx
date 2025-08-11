import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { useQuery } from '@tanstack/react-query'
import { Button, Image, Switch, Table, TableProps } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { getBackgrounds } from '../api'
import { useTranslation } from 'react-i18next'
import { VideoCameraFilled } from '@ant-design/icons'
import { twMerge } from 'tailwind-merge'
import { useNavigate } from 'react-router'

interface IProps {
  setDeleteOpen: Dispatch<SetStateAction<boolean>>
}

function MainContentTable({ setDeleteOpen }: IProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const columns: TableProps['columns'] = [
    {
      title: 'Картина',
      key: 'preview',
      dataIndex: 'preview',
      className: 'w-1/2',
      render: value => (
        <div
          className={twMerge(
            'size-[52px] overflow-hidden rounded-2xl bg-secondary-light',
            !value && 'flex items-center justify-center',
          )}
        >
          {value ? (
            <Image
              rootClassName="h-full"
              src={value}
              loading="lazy"
              className="h-full w-full object-cover"
              alt="Фоновое изображение"
            />
          ) : (
            <VideoCameraFilled className="text-2xl text-secondary/50" />
          )}
        </div>
      ),
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      className: 'w-1/2',
      render: value => <Switch checked={value} />,
    },
    {
      title: 'Действие',
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Button
            type="link"
            onClick={() => navigate(`/content/main/edit/${record?.id}`)}
          >
            <EditIcon className="text-xl" />
            {t('common.edit')}
          </Button>
          <Button type="link" danger onClick={() => setDeleteOpen(true)}>
            <DeleteIcon className="text-xl" />
            {t('common.delete')}
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
        id: item?.id,
        video: item?.video,
        preview: item?.preview_image,
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
