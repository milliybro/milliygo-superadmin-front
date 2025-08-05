import ImageUploadIcon from '@/components/icons/image-upload'
import QuillEditor from '@/features/content/components/quill-editor'
import { useTourImageStore } from '@/features/content/store/image-store'
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
import { useDiscoverContext } from '../../hooks/use-discover-context'
import { useLocation } from 'react-router'

export default function CreateDiscoverContent() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm()
  const [content, setContent] = useState<string>('')
  const { singleDiscover, createDiscovery, editDiscovery } =
    useDiscoverContext()

  const { message } = App.useApp()
  const { t } = useTranslation()
  const [_file, setFile] = useState<{ file: File; url: string } | null>(null)
  const { addImage, setImages } = useTourImageStore()
  const { pathname } = useLocation()

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      message.error(t('common.images_limit'))
      return
    }
    setFile({ file, url: URL.createObjectURL(file) })
  }

  useEffect(() => {
    if (singleDiscover?.data) {
      setContent(singleDiscover.data.content || '')
      form.setFieldsValue({
        title: singleDiscover.data.name,
      })
    }
  }, [singleDiscover])

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
        href: '/content/discover-uzbekistan',
      },
      {
        title: pathname.includes('create') ? 'Создать' : 'Редактировать',
      },
    ])

    return () => {
      setImages([])
      setFile(null)
    }
  }, [])

  const finishHandler = (values: any) => {
    const data = new FormData()
    const obj = {
      title: values.title,
      description: values.description,
      content,
    }

    data.append('translations', JSON.stringify(obj))
    // data.append('translations[ru][name]', values.title)
    // data.append('translations[ru][description]', values.description)
    // data.append('translations[ru][content]', content)

    if (_file) {
      data.append('image', _file.file)
    }

    if (pathname.includes('edit')) {
      editDiscovery.mutate(data)
    } else if (pathname.includes('create')) {
      createDiscovery.mutate(data)
    }
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить Узбекистан вместе с нами
      </Typography.Title>
      <div className="flex gap-10">
        <div className="flex w-full grow-0 basis-1/2 flex-col gap-6 rounded-2xl border p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            Добавить контента
          </Typography.Title>
          <Divider className="m-0" />
          <QuillEditor value={content} onChange={setContent} />
        </div>
        <Form
          className="flex w-full flex-shrink-0 basis-1/2 flex-col gap-6"
          form={form}
          layout="vertical"
          onFinish={finishHandler}
        >
          <div className="flex flex-col gap-4 rounded-2xl border p-6">
            <Typography.Title level={5} className="text-xl font-medium">
              Предпросмотр
            </Typography.Title>
            <Divider className="m-0" />
            <Form.Item name="title" label="Название">
              <Input placeholder="Введите название" size="large" />
            </Form.Item>
            <Form.Item name="description" label="Описание">
              <Input.TextArea
                rows={6}
                placeholder="Введите короткое описание"
                size="large"
              />
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
      <Button
        type="primary"
        onClick={() => form.submit()}
        size="large"
        className="w-[200px]"
      >
        {t('common.save')}
      </Button>
    </div>
  )
}
