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

import {
  createExpertAdvice,
  getExpertAdvice,
  patchExpertAdvice,
} from '../../api'

import ImageUploadIcon from '@/components/icons/image-upload'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import QuillEditor from '../../components/quill-editor'

import { useImageCompression } from '@/hooks/use-image-compression'
import type { Rule } from 'antd/es/form'
import type { RcFile } from 'antd/es/upload'

type CreateExpertAdviceValues = {
  title: string
  description: string
  content: string
  image: RcFile
}

export default function CreateExpertAdvice() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { compress, isCompressing } = useImageCompression()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { setBreadCrumbs } = useBreadCrumbsStore()

  const [form] = Form.useForm()
  const imageField = Form.useWatch('image', form)
  const isEditing = pathname.includes('/edit')

  const expertAdviceItem = useQuery({
    queryKey: ['expert-advices-item', params.slug],
    queryFn: () => getExpertAdvice(params.slug),
    enabled: Boolean(params.slug),
    gcTime: 0,
    staleTime: 0,
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content/expert-advice' },
      { title: t('routes.expert-advices') },
    ])
  }, [])

  useEffect(() => {
    if (expertAdviceItem?.data) {
      form.setFieldsValue({
        ...expertAdviceItem.data,
        image: {
          url: expertAdviceItem.data?.image || [],
        },
      })
    }
  }, [expertAdviceItem.data])

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

      formData.append('title', values.title)
      formData.append('description', values.description)
      formData.append('content', values.content)
      formData.append('image', values.image)
      formData.append('type', '1')

      if (isEditing && params?.slug) {
        return patchExpertAdvice(params.slug, formData)
      }

      return createExpertAdvice(formData)
    },
    onSuccess: () => {
      // setChecked(prev => !prev)
      queryClient.invalidateQueries({ queryKey: ['expert-advices'] })
      navigate('/content/expert-advice')
      notification.success({
        message: t(
          `content.expert-advice.status-${isEditing ? 'updated' : 'created'}`,
        ),
      })
    },
  })

  const beforeUploadHandler = async (file: RcFile) => {
    const compressed = await compress(file)
    if (compressed?.compressedFile) {
      form.setFieldValue('image', compressed?.compressedFile)
    }

    // if (allFiles?.length > 6) {
    //   message.error('Вы можете загрузить не более 6 изображений.')

    //   return false
    // }

    return false
  }

  const removeHandler = () => {
    form.setFieldValue('image', undefined)
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        {t(`content.expert-advice.title-${isEditing ? 'edit' : 'add'}`)}
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
            <Form.Item
              name="title"
              label={t('fields.name.label')}
              rules={[
                {
                  required: true,
                  message: t('fields.name.required'),
                },
              ]}
            >
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

            <div className="flex flex-col">
              <div className="mb-[5px] text-sm">{t('fields.images.label')}</div>
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
                  showUploadList={false}
                  customRequest={({ onSuccess }) => {
                    setTimeout(() => onSuccess?.('ok'), 0)
                  }}
                  beforeUpload={beforeUploadHandler}
                  disabled={isCompressing}

                  // beforeUpload={handleUpload}
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
        </div>
      </Form>
      <div className="flex justify-end gap-4">
        <Button
          disabled={createOrUpdate.isPending}
          onClick={() => navigate('/content/expert-advice')}
        >
          {t('common.cancel')}
        </Button>
        <Button
          type="primary"
          onClick={form.submit}
          loading={createOrUpdate.isPending}
          className="duration-150 active:scale-95"
        >
          {params?.slug ? t('common.edit') : t('common.save')}
        </Button>
      </div>
    </div>
  )
}
