import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Divider, Form, Input, message, Typography, Upload } from 'antd'

import {
  createInstagramContent,
  getInstagramContent,
  patchInstagramContent,
} from '../../api'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import ImageUploadIcon from '@/components/icons/image-upload'

import type { Rule } from 'antd/es/form'
import type { UploadFile } from 'antd/lib'
import type { RcFile } from 'antd/es/upload'

type CreateInstagramContentValues = {
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

export default function CreateInstagramContent() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { setBreadCrumbs } = useBreadCrumbsStore()

  const [form] = Form.useForm()
  const imageField = Form.useWatch('image', form)
  const isEditing = pathname.includes('/edit')

  const instagramContentItem = useQuery({
    queryKey: ['instagram-contents-item', params.slug],
    queryFn: () => getInstagramContent(params.slug),
    enabled: Boolean(params.slug),
    gcTime: 0,
    staleTime: 0,
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/instagram' },
      { title: 'Instagram' },
    ])
  }, [])

  useEffect(() => {
    if (instagramContentItem?.data) {
      form.setFieldsValue({
        ...instagramContentItem.data,
        image: {
          url: instagramContentItem.data?.image,
        },
      })
    }
  }, [instagramContentItem.data])

  const createOrUpdate = useMutation({
    mutationFn: (values: CreateInstagramContentValues) => {
      const formattedValues = {
        ...values,
        images: values?.images?.fileList?.map(val => val?.originFileObj),
      }

      if (isEditing && params?.slug) {
        return patchInstagramContent(params.slug, formattedValues)
      }

      return createInstagramContent(formattedValues)
    },
    onSuccess: () => {
      // setChecked(prev => !prev)
      queryClient.invalidateQueries({ queryKey: ['instagram-contents'] })
      navigate('/content/instagram')
      message.success('Instagram content created!')
    },
  })

  const uploadImagesRules: Rule[] = [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.reject(new Error('Загрузите изображение'))
        }

        return Promise.resolve()
      },
    },
  ]

  const beforeUploadHandler = (file: RcFile) => {
    const fileSizeInMB = file.size / 1024 / 1024

    if (fileSizeInMB > 5) {
      message.error(`Файл "${file.name}" превышает 5MB`)
      return false
    }

    form.setFieldValue('image', file)

    return false
  }

  const removeHandler = () => {
    form.setFieldValue('image', undefined)
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить instagram content
      </Typography.Title>
      <Form
        className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6"
        form={form}
        layout="vertical"
        onFinish={createOrUpdate.mutate}
      >
        <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
          <Typography.Title level={5} className="text-xl font-medium">
            Добавить контента
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item label="Название" name="title">
            <Input placeholder="Введите название" size="large" />
          </Form.Item>
          <Form.Item label="Ссылка" name="url">
            <Input placeholder="https://" size="large" />
          </Form.Item>
          <Form.Item label="Опишите описание" name="description">
            <Input.TextArea
              placeholder="Причина"
              rows={6}
              className="resize-none"
            />
          </Form.Item>
          <div className="flex flex-col">
            <div className="mb-[5px] text-[14px]">Добавить фотографии</div>
            {imageField ? (
              <div className="grid grid-cols-3 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xl border">
                  {imageField ? (
                    <img
                      src={
                        imageField?.url
                          ? imageField?.url
                          : URL.createObjectURL(imageField)
                      }
                      alt={instagramContentItem.data?.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <Button
                    danger
                    size="small"
                    className="absolute right-2 top-2"
                    onClick={removeHandler}
                  >
                    Удалить
                  </Button>
                </div>
                <Upload.Dragger
                  className="flex size-[214.6px] flex-col items-center gap-2"
                  accept="image/*"
                  maxCount={1}
                  showUploadList={false}
                  customRequest={({ onSuccess }) => {
                    setTimeout(() => onSuccess?.('ok'), 0)
                  }}
                  beforeUpload={beforeUploadHandler}
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
                maxCount={1}
                showUploadList={false}
                customRequest={({ onSuccess }) => {
                  setTimeout(() => onSuccess?.('ok'), 0)
                }}
                beforeUpload={beforeUploadHandler}
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
              name="image"
              className="m-0 [&_.ant-form-item-control-input]:min-h-0"
              rules={uploadImagesRules}
            />
          </div>
        </div>
      </Form>
      <div className="flex justify-end gap-4">
        <Button
          disabled={createOrUpdate.isPending}
          onClick={() => navigate('/content/instagram')}
        >
          Ortga
        </Button>
        <Button
          type="primary"
          onClick={form.submit}
          loading={createOrUpdate.isPending}
        >
          Yaratish
        </Button>
      </div>
    </div>
  )
}
