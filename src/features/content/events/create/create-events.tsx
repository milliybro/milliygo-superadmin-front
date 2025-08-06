import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Typography,
  Upload,
} from 'antd'

import { createEvent } from '../../api'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import YandexMapPicker from './yandex-map-picker'
import QuillEditor from '../../components/quill-editor'
import ImageUploadIcon from '@/components/icons/image-upload'

import type { Rule } from 'antd/es/form'
import type { UploadFile } from 'antd/lib'
import type { RcFile } from 'antd/es/upload'

type CreateExpertAdviceValues = {
  name: string
  description: string
  content: string
  organizer: string
  location: string
  lon: string
  lat: string
  date: string
  images: {
    fileList: UploadFile<RcFile>[]
  }
}

export default function CreateEvent() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { setBreadCrumbs } = useBreadCrumbsStore()

  const [form] = Form.useForm()
  const imagesField = Form.useWatch('images', form)

  const create = useMutation({
    mutationFn: (values: CreateExpertAdviceValues) => {
      const formData = new FormData()

      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('organizer', values.organizer)
      formData.append('content', values.content)
      formData.append('location', values.location)
      formData.append('date', dayjs(values.date).toISOString())

      console.log(values)

      values.images?.fileList?.forEach(file => {
        if (file.originFileObj) {
          formData.append('uploaded_images', file.originFileObj)
        }
      })

      if (values?.lat && values?.lon) {
        formData.append('lon', values.lon)
        formData.append('lat', values.lat)
      }

      return createEvent(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      navigate('/content/events')
      message.success('Event created!')
    },
  })

  const uploadImagesRules: Rule[] = [
    {
      validator: (_, value) => {
        const list = value?.fileList || []

        if (list.length === 0) {
          return Promise.reject(new Error('Загрузите изображение'))
        }

        if (list.length > 1) {
          return Promise.reject(
            new Error('Вы можете загрузить не более 1 изображений.'),
          )
        }

        return Promise.resolve()
      },
    },
  ]

  const beforeUploadHandler = (file: RcFile) => {
    const fileSizeInMB = file.size / 1024 / 1024
    const fileList = [file]

    const newFiles = fileList
      .filter(item => {
        const fileSizeInMB = item?.size / 1024 / 1024
        return fileSizeInMB < 6
      })
      .map(item => ({ ...file, originFileObj: item }))

    if (fileSizeInMB > 5) {
      message.error(`Файл "${file.name}" превышает 5MB`)
      return false
    }

    form.setFieldValue('images', {
      fileList: newFiles,
    })

    return false
  }

  const removeHandler = (index: number) => {
    const newList = [...(imagesField?.fileList || [])]
    newList.splice(index, 1)

    form.setFieldValue('images', { fileList: newList })
  }

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/events' },
      { title: 'Мероприятия' },
    ])
  }, [])

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить мероприятия
      </Typography.Title>
      <Form
        className="flex gap-6 [&_.ant-form-item-required]:before:hidden"
        form={form}
        layout="vertical"
        onFinish={create.mutate}
      >
        <div className="flex w-1/2 grow-0 basis-1/2 flex-col gap-6 rounded-2xl border bg-white p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            Добавить контента
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item name="content">
            <QuillEditor />
          </Form.Item>
        </div>
        <div className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
            <Typography.Title level={5} className="text-xl font-medium">
              Предпросмотр
            </Typography.Title>
            <Divider className="m-0" />
            <Form.Item name="name" label="Название">
              <Input placeholder="Введите название" size="large" />
            </Form.Item>
            <Form.Item
              label="Опишите описание"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Maydonni to'ldiring",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Причина"
                rows={6}
                className="resize-none"
              />
            </Form.Item>
            <Form.Item name="lon" hidden noStyle />
            <Form.Item name="lat" hidden noStyle />

            <div className="flex flex-col">
              <div className="mb-[5px] text-[14px]">Добавить фотографии</div>
              {imagesField?.fileList?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {imagesField?.fileList?.map((image: any, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-xl border"
                    >
                      {image?.originFileObj ? (
                        <img
                          src={URL.createObjectURL(image?.originFileObj)}
                          alt={`preview-${index}`}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                      <Button
                        danger
                        size="small"
                        className="absolute right-2 top-2"
                        onClick={() => removeHandler(index)}
                      >
                        Удалить
                      </Button>
                    </div>
                  ))}
                  <Upload.Dragger
                    className="flex size-[214.6px] flex-col items-center gap-2"
                    accept="image/*"
                    // multiple
                    maxCount={1}
                    showUploadList={false}
                    customRequest={({ onSuccess }) => {
                      setTimeout(() => onSuccess?.('ok'), 0)
                    }}
                    beforeUpload={beforeUploadHandler}
                    // beforeUpload={handleUpload}
                  >
                    <ImageUploadIcon className="text-[70px]" />
                    <Typography.Title className="m-0 text-base font-medium">
                      {t('common.select_or_drag')}
                    </Typography.Title>
                    <Typography.Paragraph className="m-0 text-sm text-secondary">
                      {t('common.images_limit')}
                    </Typography.Paragraph>
                  </Upload.Dragger>
                </div>
              ) : (
                <Upload.Dragger
                  className="flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
                  accept="image/*"
                  // multiple
                  maxCount={1}
                  showUploadList={false}
                  customRequest={({ onSuccess }) => {
                    setTimeout(() => onSuccess?.('ok'), 0)
                  }}
                  beforeUpload={beforeUploadHandler}

                  // beforeUpload={handleUpload}
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
              <Form.Item
                name="images"
                className="m-0 [&_.ant-form-item-control-input]:min-h-0"
                rules={uploadImagesRules}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
            <Typography.Title level={5} className="text-xl font-medium">
              Дополнительная информация
            </Typography.Title>
            <Divider className="m-0" />
            <Form.Item name="organizer" label="Организатор">
              <Input placeholder="Написать название" size="large" />
            </Form.Item>
            <Form.Item label="Дата" name="date">
              <DatePicker placeholder="Дата" size="large" className="w-full" />
            </Form.Item>
            <Form.Item label="Адрес" name="location">
              <Input placeholder="Введите адрес вашего отеля" size="large" />
            </Form.Item>
            <Form.Item className="overflow-hidden rounded-xl border">
              <YandexMapPicker />
            </Form.Item>
          </div>
        </div>
      </Form>
      <div className="flex justify-end gap-4">
        <Button disabled={create.isPending}>Ortga</Button>
        <Button type="primary" onClick={form.submit} loading={create.isPending}>
          Yaratish
        </Button>
      </div>
    </div>
  )
}
