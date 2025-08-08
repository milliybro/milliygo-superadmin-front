import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  Button,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  message,
  notification,
  Typography,
  Upload,
} from 'antd'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { createEvent, getEvent, patchEvent } from '../../api'

import YandexMapPicker from './yandex-map-picker'
import QuillEditor from '../../components/quill-editor'
import ImageUploadIcon from '@/components/icons/image-upload'

import type { Rule } from 'antd/es/form'
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
  image: RcFile
}

export default function CreateEvent() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { setBreadCrumbs } = useBreadCrumbsStore()

  const [form] = Form.useForm()
  const imageField = Form.useWatch('image', form)
  const isEditing = pathname.includes('/edit')

  const eventItem = useQuery({
    queryKey: ['events-item', params.slug],
    queryFn: () => getEvent(params.slug),
    enabled: Boolean(params.slug),
    gcTime: 0,
    staleTime: 0,
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content/events' },
      { title: t('routes.events') },
    ])
  }, [])

  useEffect(() => {
    if (eventItem?.data) {
      form.setFieldsValue({
        ...eventItem.data,
        date: eventItem.data?.date ? dayjs(eventItem.data?.date) : undefined,
        image: {
          url: eventItem.data?.image || [],
        },
      })
    }
  }, [eventItem.data])

  const uploadImagesRules: Rule[] = [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.reject(new Error(t('fields.images.required')))
        }

        return Promise.resolve()
      },
    },
  ]

  const createOrUpdate = useMutation({
    mutationFn: (values: CreateExpertAdviceValues) => {
      const formData = new FormData()

      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('organizer', values.organizer)
      formData.append('content', values.content)
      formData.append('location', values.location)
      formData.append('image', values.image)
      formData.append('date', dayjs(values.date).toISOString())

      if (values?.lat && values?.lon) {
        formData.append('lon', values.lon)
        formData.append('lat', values.lat)
      }

      if (isEditing && params?.slug) {
        return patchEvent(params.slug, formData)
      }

      return createEvent(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      navigate('/content/events')
      notification.success({
        message: t(
          `content.events.status-${isEditing ? 'updated' : 'created'}`,
        ),
      })
    },
  })

  const beforeUploadHandler = (file: RcFile) => {
    const fileSizeInMB = file.size / 1024 / 1024

    if (fileSizeInMB > 5) {
      message.error(t('fields.images.max-size-limit', { value: file?.name }))
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
        {t(`content.events.title-${isEditing ? 'edit' : 'add'}`)}
      </Typography.Title>
      <Form
        className="flex gap-6 [&_.ant-form-item-required]:before:hidden"
        form={form}
        layout="vertical"
        onFinish={createOrUpdate.mutate}
      >
        <div className="flex w-1/2 grow-0 basis-1/2 flex-col gap-6 rounded-2xl border bg-white p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            {t(isEditing ? 'content.edit-content' : 'content.add-content')}
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item name="content">
            <QuillEditor />
          </Form.Item>
        </div>
        <div className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
            <Typography.Title level={5} className="text-xl font-medium">
              {t('content.preview')}
            </Typography.Title>
            <Divider className="m-0" />
            <Form.Item name="name" label={t('fields.name.label')}>
              <Input placeholder={t('fields.name.placeholder')} size="large" />
            </Form.Item>
            <Form.Item
              label={t('fields.description.label')}
              name="description"
              rules={[
                {
                  required: true,
                  message: t('fields.description.required'),
                },
              ]}
            >
              <Input.TextArea
                placeholder={t('fields.description.placeholder')}
                rows={6}
                className="resize-none"
              />
            </Form.Item>
            <Form.Item name="lon" hidden noStyle />
            <Form.Item name="lat" hidden noStyle />

            <div className="flex flex-col">
              <div className="mb-[5px] text-[14px]">
                {t('fields.images.label')}
              </div>
              {imageField ? (
                <div className="relative flex aspect-square h-[212px] overflow-hidden rounded-xl border">
                  {imageField ? (
                    <Image
                      src={
                        imageField?.url
                          ? imageField?.url
                          : URL.createObjectURL(imageField)
                      }
                      preview={{ toolbarRender: () => null }}
                      wrapperClassName="h-full w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:object-cover"
                    />
                  ) : null}
                  <Button
                    danger
                    size="small"
                    className="absolute right-2 top-2"
                    onClick={removeHandler}
                  >
                    {t('common.delete')}
                  </Button>
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
          <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
            <Typography.Title level={5} className="text-xl font-medium">
              {t('content.additional-information')}
            </Typography.Title>
            <Divider className="m-0" />
            <Form.Item name="organizer" label={t('fields.organizer.label')}>
              <Input
                placeholder={t('fields.organizer.placeholder')}
                size="large"
              />
            </Form.Item>
            <Form.Item label={t('fields.date.label')} name="date">
              <DatePicker
                placeholder={t('fields.date.placeholder')}
                size="large"
                className="w-full"
              />
            </Form.Item>
            <Form.Item label={t('fields.address.label')} name="location">
              <Input
                placeholder={t('fields.address.placeholder2')}
                size="large"
              />
            </Form.Item>
            <Form.Item className="overflow-hidden rounded-xl border">
              <YandexMapPicker />
            </Form.Item>
          </div>
        </div>
      </Form>
      <div className="flex justify-end gap-4">
        <Button
          disabled={createOrUpdate.isPending}
          onClick={() => navigate('/content/events')}
        >
          {t('common.cancel')}
        </Button>
        <Button
          type="primary"
          onClick={form.submit}
          loading={createOrUpdate.isPending}
        >
          {isEditing ? t('common.edit') : t('common.save')}
        </Button>
      </div>
    </div>
  )
}
