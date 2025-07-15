import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import ImageUploadIcon from '@/components/icons/image-upload'
import ResetIcon from '@/components/icons/reset'
import UserIcon from '@/components/icons/user'
import BlurImage from '@/components/ui/blur-image'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Switch,
  Table,
  TableProps,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function MainPageContent() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [file, setFile] = useState<{ file: File; url: string } | null>(null)

  const { t } = useTranslation()
  const { message } = App.useApp()

  const columns: TableProps['columns'] = [
    {
      title: 'Картина',
      key: 'image',
      dataIndex: 'image',
      className: 'w-1/2',
      render: () => (
        <div className="size-[52px] rounded-2xl bg-secondary"></div>
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
          <Button type="link" danger>
            <DeleteIcon className="text-xl" />
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      message.error(t('common.images_limit'))
      return
    }
    setFile({ file, url: URL.createObjectURL(file) })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography.Title level={2} className="text-lg font-medium">
          Главная страница
        </Typography.Title>
        <Button type="primary" onClick={() => setShowModal(true)}>
          <PlusOutlined />
          Добавить
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={[{ key: '1' }]}
        bordered
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
          position: ['bottomCenter'],
        }}
      />

      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false)
          setFile(null)
        }}
        closeIcon={<CloseOutlined className="text-black" />}
        footer={null}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-[62px] items-center justify-center rounded-full border-[7px] border-[#EFF6FF] bg-[#DBEAFE]">
            <UserIcon className="text-2xl text-primary" />
          </div>
          <Typography.Title level={3} className="text-2xl">
            Добавить
          </Typography.Title>
          <div className="w-full text-left">
            <Typography.Text className="mb-2 block text-left text-base font-medium">
              Добавить фотографии или видео
            </Typography.Text>
            {file ? (
              <div className="relative mb-2 h-52 w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src={file.url}
                  alt="Uploaded file"
                  className="h-full w-full object-cover object-[center_center] opacity-80"
                />
                <Button
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white hover:text-white/70"
                  type="link"
                  onClick={() => {
                    setFile(null)
                  }}
                >
                  <ResetIcon className="text-lg" />
                  Перезагрузить
                </Button>
              </div>
            ) : (
              <Upload.Dragger
                className="mb-2 flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
                accept="image/*,video/*"
                multiple={false}
                showUploadList={false}
                beforeUpload={handleUpload}
              >
                <ImageUploadIcon className="text-[70px]" />
                <Typography.Title className="m-0 text-base font-medium">
                  {t('common.select_or_drag')}
                </Typography.Title>
                <Typography.Paragraph className="m-0 text-sm text-secondary">
                  {t('common.images_limit')}
                </Typography.Paragraph>
              </Upload.Dragger>
            )}
            <Form
              layout="vertical"
              requiredMark={false}
              className="flex flex-col gap-3"
            >
              <Form.Item label="Название" name="title">
                <Input placeholder="Введите название" />
              </Form.Item>
              <Form.Item label="Описание" name="description">
                <Input.TextArea placeholder="Введите описание" rows={5} />
              </Form.Item>
              <div className="flex items-center justify-center gap-4">
                <Button className="">Отменить</Button>
                <Button type="primary">Сохранить</Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MainPageContent
