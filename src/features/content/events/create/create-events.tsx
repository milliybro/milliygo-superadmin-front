import ImageUploadIcon from '@/components/icons/image-upload'
import { useImageCompression } from '@/hooks/use-image-compression'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  notification,
  Select,
  Typography,
  Upload,
} from 'antd'
import type { Rule } from 'antd/es/form'
import type { RcFile } from 'antd/es/upload'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'
import { createEvent, getEvent, patchEvent } from '../../api'
import QuillEditor from '../../components/quill-editor'
import { useMapCoordsStore } from '../../top-destinations/store/map-coords-store'
import YandexMapPicker from './yandex-map-picker'
import { useEventImage } from '../store/event-image'

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
  const { coords, setCoords, updatedCoords } = useMapCoordsStore()
  const { compress, isCompressing } = useImageCompression()
  const { image, removeImage, setImage } = useEventImage()

  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { setBreadCrumbs } = useBreadCrumbsStore()
  const locale = localStorage.getItem('i18nextLng')
  const [language, setLanguage] = useState(
    locale === 'oz' ? 'uz-latin' : locale || 'en',
  )

  const [form] = Form.useForm()
  const isEditing = pathname.includes('/edit')

  const eventItem = useQuery({
    queryKey: ['events-item', params.slug, language],
    queryFn: () => getEvent(params.slug, language),
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

    return () => {
      setImage(null)
    }
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
      setImage({
        url: eventItem.data?.image || null,
        file: null,
        resized: null,
      })
      setCoords([
        [eventItem.data?.lat || 41.3111, eventItem.data?.lon || 69.2797],
      ])
    }
  }, [eventItem.data])

  const uploadImagesRules: Rule[] = [
    {
      validator: (_, value) => {
        if (!value || (!image?.file && !image?.url)) {
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
      if (image?.file && image?.resized) {
        formData.append('image', image?.file)
        formData.append('resized_image', image?.resized)
      }
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

  const beforeUploadHandler = async (file: RcFile) => {
    const compressed = await compress(file, { height: 190, width: 278 })

    if (compressed?.compressedFile) {
      form.setFieldValue('image', compressed?.compressedFile)
      setImage({
        file: compressed?.compressedFile,
        url: URL.createObjectURL(compressed?.compressedFile),
        resized: compressed?.resizedFile || null,
      })
    }

    return false
  }
  const LANGUAGES = [
    ['en', 'English'],
    ['ru', 'Russian'],
    ['uz-latin', 'Uzbek (Latin)'],
    ['uz-cyrillic', 'Ўзбек (Кирил)'],
    ['ko', 'Korean'],
    ['tr', 'Turkish'],
    ['de', 'Deutsch'],
    ['fr', 'French'],
    ['it', 'Italian'],
    ['es', 'Espanol'],
    ['pt', 'Portugal'],
    ['ar', 'Arabic'],
    ['zh-cn', 'Chinese'],
    ['ja', 'Japanese'],
    ['hi', 'Hindi'],
    ['ur', 'Urdu'],
    ['tg', 'Tajik'],
    ['kk', 'Kazakh'],
    ['ky', 'Kyrgyz'],
    ['tk', 'Turkmen'],
    ['az', 'Azerbaijan'],
  ]
  const options = LANGUAGES.map(([value, label]) => ({
    label,
    value,
  }))

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
            <div className="flex items-center justify-between">
              <Typography.Title level={5} className="text-xl font-medium">
                {t('content.preview')}
              </Typography.Title>
              <Select
                showSearch
                placeholder="Select language"
                optionFilterProp="label"
                size="large"
                style={{ width: 240 }}
                options={options}
                value={language}
                onChange={val => setLanguage(val)}
              />
            </div>

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
              <div className="mb-[5px] text-sm">{t('fields.images.label')}</div>
              {image?.file || image?.url ? (
                <div className="relative flex aspect-square h-[212px] overflow-hidden rounded-xl border">
                  <Image
                    src={
                      image?.url
                        ? image?.url
                        : image?.file
                          ? URL.createObjectURL(image?.file)
                          : ''
                    }
                    preview={{ toolbarRender: () => null }}
                    wrapperClassName="h-full w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:object-cover"
                  />
                  <Button
                    danger
                    size="small"
                    className="absolute right-2 top-2"
                    onClick={removeImage}
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
                  disabled={isCompressing}
                >
                  <ImageUploadIcon className="text-[4.375rem]" />
                  <Typography.Title className="m-0 text-base font-medium">
                    {t('common.select_or_drag')}
                  </Typography.Title>
                  <Typography.Paragraph className="m-0 text-sm text-secondary">
                    {t('common.images_limit', {
                      limit: '5 MB',
                    })}
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
              <YandexMapPicker
                coordsValue={coords?.[0]}
                onCoordsChange={newCoords => updatedCoords(0, newCoords)}
              />
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
