import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  notification,
  Select,
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
}

export default function CreateExpertAdvice() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isEditing = pathname.includes('/edit')

  const { compress, isCompressing } = useImageCompression()
  const { setImage, image, removeImage } = useExpertAdviceImage()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { setBreadCrumbs } = useBreadCrumbsStore()

  const [form] = Form.useForm()

  // 🌍 Language state
  const locale = localStorage.getItem('i18nextLng')
  const [language, setLanguage] = useState(
    locale === 'oz' ? 'uz-latin' : locale || 'en',
  )

  // 👉 Create holatda faqat EN
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
      validator: () => {
        if (!image?.file && !image?.url) {
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
      formData.append('content', transformImages(values.content))

      if (image?.file && image?.resized) {
        formData.append('image', image.file)
        formData.append('resized_image', image.resized)
      }

      formData.append('type', '1')

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
      notification.error({
        message: t('common.error'),
        description:
          error?.response?.data?.message || error?.message || 'Failed to save',
      })
    },
  })

  const beforeUploadHandler = async (file: RcFile) => {
    const compressed = await compress(file, { width: 588, height: 320 })
    if (compressed) {
      setImage({
        file: compressed.compressedFile,
        url: URL.createObjectURL(compressed.compressedFile),
        resized: compressed.resizedFile,
      })
      form.setFieldValue('image', compressed.compressedFile)
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

  // 👉 Language options (edit vs create)
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
        className="flex gap-6"
        form={form}
        layout="vertical"
        onFinish={createOrUpdate.mutate}
      >
        <div className="flex w-1/2 flex-col gap-6 rounded-2xl border bg-white p-6">
          <Typography.Title level={5}>
            {t(isEditing ? 'content.edit-content' : 'content.add-content')}
          </Typography.Title>
          <Divider />
          <Form.Item name="content">
            <QuillEditor />
          </Form.Item>
        </div>

        <div className="flex w-1/2 flex-col gap-6">
          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <Typography.Title level={5}>
                {t('content.preview')}
              </Typography.Title>

              {/* 🌍 Language Select */}
              <Select
                showSearch={isEditing}
                size="large"
                style={{ width: 240 }}
                options={languageOptions}
                value={language}
                onChange={setLanguage}
                disabled={!isEditing}
              />
            </div>

            <Divider />

            <Form.Item
              name="title"
              label={t('fields.name.label')}
              rules={[{ required: true }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="description"
              label={t('fields.description.label')}
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>

            <Form.Item name="image" hidden rules={uploadImagesRules}>
              <Input hidden />
            </Form.Item>

            {image?.file || image?.url ? (
              <div className="relative h-[212px] overflow-hidden rounded-xl border">
                <Image src={image.url} preview={false} />
                <Button danger size="small" onClick={removeImage}>
                  {t('common.delete')}
                </Button>
              </div>
            ) : (
              <Upload.Dragger
                showUploadList={false}
                beforeUpload={beforeUploadHandler}
                disabled={isCompressing}
              >
                <ImageUploadIcon />
                <Typography.Text>{t('common.select_or_drag')}</Typography.Text>
              </Upload.Dragger>
            )}
          </div>
        </div>
      </Form>
    </div>
  )
}
