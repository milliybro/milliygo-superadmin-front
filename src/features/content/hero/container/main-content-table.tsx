import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { VideoCameraFilled } from '@ant-design/icons'
import { Button, Image, Switch, Table, TableProps, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { useHeroContext } from '../hooks/use-hero-context'
import { useMemo } from 'react'

function MainContentTable() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    setShowDeleteModal,
    videoLists: { data: bgList },
    editBackground: { mutate },
  } = useHeroContext()

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
      render: (value, record) => (
        <Switch
          checked={value}
          onChange={val => mutate({ is_active: val, id: record.id })}
        />
      ),
    },
    {
      title: 'Действие',
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Tooltip title={t('common.edit')}>
            <Button
              type="link"
              className="p-0"
              onClick={() => navigate(`/content/main/edit/${record?.id}`)}
            >
              <EditIcon className="text-xl" />
            </Button>
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <Button
              type="link"
              danger
              onClick={() =>
                setShowDeleteModal(record?.id || record?.key || null)
              }
              className="p-0"
            >
              <DeleteIcon className="text-xl" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

  const data = useMemo(
    () =>
      bgList?.results?.map(item => ({
        key: item?.id,
        id: item?.id,
        video: item?.video,
        preview: item?.preview_image,
        status: item?.is_active,
      })) || [],
    [bgList],
  )

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
