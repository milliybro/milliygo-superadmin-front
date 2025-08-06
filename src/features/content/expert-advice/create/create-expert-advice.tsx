import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Divider, Form, Input, message, Typography, Upload } from 'antd'

import {
  createExpertAdvice,
  deleteExpertAdviceImage,
  getExpertAdvice,
  patchExpertAdvice,
} from '../../api'

import ImageUploadIcon from '@/components/icons/image-upload'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import QuillEditor from '../../components/quill-editor'

import type { Rule } from 'antd/es/form'
import type { UploadFile } from 'antd/lib'
import type { RcFile } from 'antd/es/upload'

type CreateExpertAdviceValues = {
  title: string
  description: string
  content: string
  uploaded_images: {
    fileList: UploadFile<RcFile>[]
  }
}

export default function CreateExpertAdvice() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { setBreadCrumbs } = useBreadCrumbsStore()

  const [form] = Form.useForm()
  const imagesField = Form.useWatch('uploaded_images', form)
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
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/expert-advice' },
      { title: 'Советы экспертов' },
    ])
  }, [])

  useEffect(() => {
    if (expertAdviceItem?.data) {
      const transformedImages = expertAdviceItem.data?.images?.map(url => ({
        id: url?.id,
        uid: `existing-${url.id}`,
        url: url?.image_path,
      }))

      form.setFieldsValue({
        ...expertAdviceItem.data,
        uploaded_images: {
          fileList: transformedImages || [],
        },
      })
    }
  }, [expertAdviceItem.data])

  const uploadImagesRules: Rule[] = [
    {
      validator: (_, value) => {
        const list = value?.fileList || []

        if (list.length === 0) {
          return Promise.reject(new Error('Загрузите хотя бы одно изображение'))
        }

        if (list.length > 6) {
          return Promise.reject(
            new Error('Вы можете загрузить не более 6 изображений.'),
          )
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
      formData.append('type', '1')

      values.uploaded_images?.fileList?.forEach(file => {
        if (file.originFileObj) {
          formData.append('uploaded_images', file.originFileObj)
        }
      })

      if (isEditing && params?.slug) {
        return patchExpertAdvice(params.slug, formData)
      }

      return createExpertAdvice(formData)
    },
    onSuccess: () => {
      // setChecked(prev => !prev)
      queryClient.invalidateQueries({ queryKey: ['expert-advices'] })
      navigate('/content/expert-advice')
      message.success('Expert advice created!')
    },
  })

  const deleteImage = useMutation({
    mutationFn: (values: { image_id: number }) =>
      deleteExpertAdviceImage(values),
    onSuccess: () => {},
  })

  const beforeUploadHandler = (file: RcFile, fileList: RcFile[]) => {
    const fileSizeInMB = file.size / 1024 / 1024

    const newFiles = fileList
      .filter(item => {
        const fileSizeInMB = item?.size / 1024 / 1024
        return fileSizeInMB < 6
      })
      .map(item => ({ ...file, originFileObj: item }))

    const allFiles = [...(imagesField?.fileList || []), ...(newFiles || [])]

    if (fileSizeInMB > 5) {
      message.error(`Файл "${file.name}" превышает 5MB`)
      return false
    }

    // if (allFiles?.length > 6) {
    //   message.error('Вы можете загрузить не более 6 изображений.')

    //   return false
    // }

    form.setFieldValue('uploaded_images', {
      fileList: allFiles,
    })

    return false
  }

  const removeHandler = (index: number, imageId: number) => {
    if (imageId) {
      deleteImage.mutate({ image_id: imageId })
    }

    const newList = [...(imagesField?.fileList || [])]
    newList.splice(index, 1)

    form.setFieldValue('uploaded_images', { fileList: newList })
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить cоветы экспертов
      </Typography.Title>
      <Form
        className="flex gap-6 [&_.ant-form-item-required]:before:hidden"
        form={form}
        layout="vertical"
        onFinish={createOrUpdate.mutate}
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
            <Form.Item
              name="title"
              label="Название"
              rules={[
                {
                  required: true,
                  message: "Maydonni to'ldiring",
                },
              ]}
            >
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

            <div className="flex flex-col">
              <div className="mb-[5px] text-[14px]">Добавить фотографии</div>
              {imagesField?.fileList?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {imagesField?.fileList?.map((image: any, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-xl border"
                    >
                      {image?.originFileObj || image?.url ? (
                        <img
                          src={
                            image?.originFileObj
                              ? URL.createObjectURL(image.originFileObj)
                              : image?.url
                          }
                          alt={`preview-${index}`}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                      <Button
                        danger
                        size="small"
                        className="absolute right-2 top-2"
                        onClick={() => removeHandler(index, image?.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  ))}
                  <Upload.Dragger
                    className="flex size-[214.6px] flex-col items-center gap-2"
                    accept="image/*"
                    multiple
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
                  multiple
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
                name="uploaded_images"
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
          Ortga
        </Button>
        <Button
          type="primary"
          onClick={form.submit}
          loading={createOrUpdate.isPending}
          className="duration-150 active:scale-95"
          // disabled={images?.fileList?.length === 0}
        >
          {params?.slug ? "O'zgartirish" : 'Yaratish'}
        </Button>
      </div>
    </div>
  )
}
