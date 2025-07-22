import ImageUploadIcon from '@/components/icons/image-upload'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import {
  App,
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

export default function CreateDiscoverContent() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm()

  const { message } = App.useApp()
  const { t } = useTranslation()
  const [_file, setFile] = useState<{ file: File; url: string } | null>(null)
  const { setImages } = useTourImageStore()

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      message.error(t('common.images_limit'))
      return
    }
    setFile({ file, url: URL.createObjectURL(file) })
  }

  useEffect(() => {
    setBreadCrumbs([
      {
        title: 'Главная',
        href: '/',
      },
      {
        title: 'Контент',
        href: '/content/discover-uzbekistan',
      },
      {
        title: 'Откройте Узбекистан вместе с нами',
      },
    ])

    return () => {
      setImages([])
      setFile(null)
    }
  }, [])

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить Узбекистан вместе с нами
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
        </Form>
      </div>
    </div>
  )
}
