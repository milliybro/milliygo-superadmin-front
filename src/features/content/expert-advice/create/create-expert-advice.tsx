import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  notification,
  Select,
  Switch,
  Tooltip,
  Typography,
  Upload,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
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
import { useExpertAdviceImage } from '../store/expert-advice-image'
import { transformImages } from '@/utils/transform-images'

type CreateExpertAdviceValues = {
  title: string
  description: string
  content: string
  image: RcFile
  translate_all: string
  refresh_cache: boolean
}

export default function CreateExpertAdvice() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { compress, isCompressing } = useImageCompression()
  const { setImage, image, removeImage } = useExpertAdviceImage()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { setBreadCrumbs } = useBreadCrumbsStore()

  const [form] = Form.useForm()
  const isEditing = pathname.includes('/edit')
  const locale = localStorage.getItem('i18nextLng')
  const [language, setLanguage] = useState(
    locale === 'oz' ? 'uz-latin' : locale || 'en',
  )
  useEffect(() => {
    if (!isEditing) {
      setLanguage('en')
    }
  }, [isEditing])

  const expertAdviceItem = useQuery({
    queryKey: ['expert-advices-item', params.slug, language],
    queryFn: () => getExpertAdvice(params.slug, language),
    enabled: Boolean(params.slug),
    staleTime: 0,
    gcTime: 0,
  })

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content/expert-advice' },
      { title: t('routes.expert-advices') },
    ])

    return () => {
      setImage(null)
    }
  }, [])

  useEffect(() => {
    if (expertAdviceItem?.data) {
      form.setFieldsValue({
        ...expertAdviceItem.data,
        image: { url: expertAdviceItem.data?.image || [] },
        file: null,
      })

      setImage({
        url: expertAdviceItem.data?.image,
        file: null,
      })
    }
  }, [expertAdviceItem.data])

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

      formData.append('title', values.title)
      formData.append('description', transformImages(values.description))
      formData.append('content', transformImages(values.content))

      if (image?.file && image?.resized) {
        formData.append('image', image?.file)
        formData.append('resized_image', image?.resized)
      }

      formData.append('type', '1')
      values.translate_all != null &&
        formData.append('translate_all', String(values.translate_all))
      values.refresh_cache != null &&
        formData.append('refresh_cache', String(values.refresh_cache))

      if (isEditing && params?.slug) {
        return patchExpertAdvice(params.slug, formData, language)
      }

      return createExpertAdvice(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expert-advices'] })
      navigate('/content/expert-advice')
      notification.success({
        message: t(
          `content.expert-advice.status-${isEditing ? 'updated' : 'created'}`,
        ),
      })
    },
    onError: (error: any) => {
      console.error('Submission error:', error)
      notification.error({
        message: t('common.error'),
        description:
          error?.response?.data?.message ||
          error?.message ||
          'Failed to save. Please try again.',
      })
    },
  })

  const beforeUploadHandler = async (file: RcFile) => {
    const compressed = await compress(file, { width: 588, height: 320 })
    if (compressed) {
      setImage({
        file: compressed?.compressedFile,
        url: URL.createObjectURL(compressed?.compressedFile),
        resized: compressed?.resizedFile,
      })
      form.setFieldValue('image', compressed?.compressedFile)
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

  const allOptions = LANGUAGES.map(([value, label]) => ({ label, value }))
  const languageOptions = useMemo(() => {
    if (!isEditing) {
      return [{ label: 'English', value: 'en' }]
    }
    return allOptions
  }, [isEditing])

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
        onFinishFailed={info => {
          console.log(info)
          const contentDiv = document.getElementById('main-content')
          if (contentDiv) {
            contentDiv.scroll({ top: 300, behavior: 'smooth' })
          }
        }}
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
            <div className="flex flex-col">
              <Typography.Title level={5} className="text-xl font-medium">
                {t('content.preview')}
              </Typography.Title>
              <div className="flex items-center justify-between gap-2">
                {isEditing && (
                  <div className="flex items-center gap-6 rounded-[8px] border border-[#E5E7EB] px-4 py-2">
                    <Typography.Text>{t('common.clear-cache')}</Typography.Text>

                    <div className="flex items-center gap-3">
                      <Form.Item
                        name="refresh_cache"
                        valuePropName="checked"
                        noStyle
                        initialValue={false}
                      >
                        <Switch />
                      </Form.Item>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="flex items-center gap-6 rounded-[8px] border border-[#E5E7EB] px-4 py-2">
                    <Typography.Text>
                      {t('common.auto-translate')}
                    </Typography.Text>

                    <div className="flex items-center gap-3">
                      <Form.Item
                        name="translate_all"
                        valuePropName="checked"
                        noStyle
                        initialValue={false}
                      >
                        <Switch />
                      </Form.Item>

                      <Tooltip
                        title={
                          <>
                            <b className="pb-1">{t('common.auto-trans')}</b>
                            <br />
                            {t('common.auto-trans-desc')}
                          </>
                        }
                        overlayInnerStyle={{
                          padding: '12px',
                          backgroundColor: '#232E40',
                          color: '#fff',
                          width: '320px',
                        }}
                      >
                        <div className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border border-[#777E90] text-[12px] text-[#777E90]">
                          ?
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                )}

                <Select
                  showSearch
                  placeholder="Select language"
                  optionFilterProp="label"
                  size="large"
                  style={{ width: 240 }}
                  options={languageOptions}
                  value={language}
                  onChange={val => setLanguage(val)}
                />
              </div>
            </div>
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
              {/* <QuillEditor placeholder={t('fields.name.placeholder')} />
               */}
              <Input placeholder={t('fields.name.placeholder')} />
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
              <QuillEditor placeholder={t('fields.description.placeholder')} />
            </Form.Item>
            <div>
              <Form.Item name="image" hidden rules={uploadImagesRules}>
                <Input hidden />
              </Form.Item>
            </div>

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
