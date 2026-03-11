import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  notification,
  Typography,
  Upload,
} from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import {
  createInstagramContent,
  getInstagramContent,
  patchInstagramContent,
} from '../../api'

import ImageUploadIcon from '@/components/icons/image-upload'

import { useImageCompression } from '@/hooks/use-image-compression'
import type { Rule } from 'antd/es/form'
import type { RcFile } from 'antd/es/upload'
import { useInstagramImage } from '../store/instagram-image'

type CreateInstagramContentValues = {
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

export default function CreateInstagramContent() {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const queryClient = useQueryClient()
  const { setImage, image, removeImage } = useInstagramImage()
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm()
  const isEditing = pathname.includes('/edit')
  const { compress, isCompressing } = useImageCompression()

  const instagramContentItem = useQuery({
    queryKey: ['instagram-contents-item', params.slug],
    queryFn: () => getInstagramContent(params.slug),
    enabled: Boolean(params.slug),
    gcTime: 0,
    staleTime: 0,
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content/instagram' },
      { title: 'Instagram' },
    ])
  }, [])

  useEffect(() => {
    if (instagramContentItem?.data) {
      form.setFieldsValue({
        ...instagramContentItem.data,
      })

      if (instagramContentItem.data?.image) {
        form.setFieldsValue({
          image: {
            url: instagramContentItem.data?.image,
          },
        })
        setImage({
          url: instagramContentItem.data?.image,
          file: null,
        })
      }
    }
  }, [instagramContentItem.data])

  useEffect(() => {
    return () => {
      setImage(null)
    }
  }, [])

  const createOrUpdate = useMutation({
    mutationFn: (values: CreateInstagramContentValues) => {
      if (isEditing && params?.slug) {
        return patchInstagramContent(params.slug, values)
      }

      return createInstagramContent(values)
    },
    onSuccess: () => {
      // setChecked(prev => !prev)
      queryClient.invalidateQueries({ queryKey: ['instagram-contents'] })
      navigate('/content/instagram')
      notification.success({
        message: t(
          `content.instagram-content.status-${isEditing ? 'updated' : 'created'}`,
        ),
      })
    },
  })

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

  const beforeUploadHandler = async (file: RcFile) => {
    // const fileSizeInMB = file.size / 1024 / 1024
    const compressed = await compress(file, { height: 660, width: 1200 })
    // if (fileSizeInMB > 5) {
    //   message.error(t('fields.images.max-size-limit', { value: file?.name }))
    //   return false
    // }

    if (!compressed?.resizedFile) {
      return false
    }

    form.setFieldValue('image', compressed?.resizedFile)
    setImage({
      url: URL.createObjectURL(compressed?.resizedFile),
      file: compressed?.resizedFile,
    })

    return false
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        {t(`content.instagram-content.title-${isEditing ? 'edit' : 'add'}`)}
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={createOrUpdate.mutate}
        className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6"
      >
        <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
          <Typography.Title level={5} className="text-xl font-medium">
            {t(isEditing ? 'content.edit-content' : 'content.add-content')}
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item
            label={t('fields.name.label')}
            name="title"
            rules={[{ required: true, message: t('fields.name.required') }]}
          >
            <Input placeholder={t('fields.name.placeholder')} size="large" />
          </Form.Item>
          <Form.Item
            label={t('fields.url.label')}
            name="url"
            rules={[{ required: true, message: t('fields.url.error') }]}
          >
            <Input placeholder="https://" size="large" />
          </Form.Item>
          <Form.Item
            label={t('fields.description.label')}
            name="description"
            rules={[
              { required: true, message: t('fields.description.required') },
            ]}
          >
            <Input.TextArea
              placeholder={t('fields.description.placeholder')}
              rows={6}
              className="resize-none"
            />
          </Form.Item>
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
                  {t('common.images_limit', { limit: '5 MB' })}
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
          {t('common.cancel')}
        </Button>
        <Button
          type="primary"
          onClick={form.submit}
          loading={createOrUpdate.isPending}
        >
          {t(isEditing ? 'common.save' : 'common.create')}
        </Button>
      </div>
    </div>
  )
}
