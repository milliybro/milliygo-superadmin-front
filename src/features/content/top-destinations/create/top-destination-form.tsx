import ImageUploadIcon from '@/components/icons/image-upload'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import {
  App,
  Button,
  Divider,
  Form,
  Input,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import QuillEditor from '../../components/quill-editor'
import { useTourImageStore } from '../../store/image-store'
import { CloseOutlined, StarFilled } from '@ant-design/icons'

export default function TopDestinationForm() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const { t } = useTranslation()
  const [_file, setFile] = useState<{ file: File; url: string } | null>(null)
  const { images, removeImage, addImage, setMainImage, setImages } =
    useTourImageStore()

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      message.error(t('common.images_limit'))
      return
    }
    setFile({ file, url: URL.createObjectURL(file) })
  }

  const handleUploadGallery: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      message.error(t('common.images_limit'))
      return
    }
    addImage({ file, image: URL.createObjectURL(file), is_main: false })
  }

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/top-destinations' },
      { title: 'Лучшие направления' },
    ])

    return () => {
      setImages([])
      setFile(null)
    }
  }, [])

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить лучшие направления
      </Typography.Title>
      <div className="flex gap-10">
        <div className="flex w-1/2 grow-0 basis-1/2 flex-col gap-6 rounded-2xl border p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            Добавить контента
          </Typography.Title>
          <Divider className="m-0" />
          <QuillEditor />
        </div>
        <Form
          className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6"
          form={form}
          layout="vertical"
        >
          <div className="flex flex-col gap-4 rounded-2xl border p-6">
            <Typography.Title level={5} className="text-xl font-medium">
              Предпросмотр
            </Typography.Title>
            <Divider className="m-0" />
            <Form.Item name="title" label="Название">
              <Input placeholder="Введите название" size="large" />
            </Form.Item>
            <Form.Item label="Добавить фотографии">
              <Upload.Dragger
                className="mb-2 flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
                accept="image/*"
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
            </Form.Item>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border p-6">
            <Typography.Title level={5} className="text-xl font-medium">
              Добавить популярные места
            </Typography.Title>
            <Divider className="m-0" />
            <Form.Item name="title" label="Название места">
              <Input placeholder="Введите название" size="large" />
            </Form.Item>
            <Form.Item name="description" label="Описание места">
              <Input.TextArea
                rows={10}
                placeholder="Введите описание"
                size="large"
              />
            </Form.Item>
            <Form.Item name="location" label="Локация">
              <Input placeholder="Введите локацию" size="large" />
            </Form.Item>
            <Form.Item label="Добавить фотографии отеля">
              <Upload.Dragger
                className="mb-2 flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
                accept="image/*"
                multiple={false}
                showUploadList={false}
                beforeUpload={handleUploadGallery}
              >
                <ImageUploadIcon className="text-[70px]" />
                <Typography.Title className="m-0 text-base font-medium">
                  {t('common.select_or_drag')}
                </Typography.Title>
                <Typography.Paragraph className="m-0 text-sm text-secondary">
                  {t('common.images_limit')}
                </Typography.Paragraph>
              </Upload.Dragger>
              <div className="flex items-center gap-2 overflow-x-auto">
                {images.map((image, i) => (
                  <div
                    key={i}
                    className="group relative block h-36 w-52 shrink-0 overflow-hidden rounded-xl border transition-all"
                  >
                    <Button
                      icon={<CloseOutlined />}
                      onClick={() => removeImage(i)}
                      className="absolute right-2 top-2 z-[1] h-10 w-10 rounded-lg"
                    />

                    {image.is_main && (
                      <div className="absolute left-2 top-2 select-none rounded-lg bg-orange-500 p-2 leading-3">
                        <StarFilled className="text-xs text-white" />
                      </div>
                    )}

                    <img
                      src={image.image}
                      alt={`Hotel image #${i}`}
                      className="block h-full w-full object-cover"
                    />
                    <div
                      className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-black/40 text-sm text-white opacity-0 transition group-hover:opacity-100"
                      onClick={() => setMainImage(i)}
                    >
                      Сделать основным
                    </div>
                  </div>
                ))}
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
