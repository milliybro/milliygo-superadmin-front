import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { Button, Divider, Form, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import QuillEditor from '@/features/content/components/quill-editor'
import { useLocation } from 'react-router'
import { transformImages } from '@/utils/transform-images'
import { useHollyTourismImage } from '../../hooks/use-holly-tourism-image'
import { useSingleHollyTourism } from '../../hooks/use-single-holly-tourism'
import { useEditHollyTourism } from '../../hooks/use-edit-holly-tourism'
import { useCreateHollyTourism } from '../../hooks/use-create-holly-tourism'
import { IHollyTourismForm } from '../../types'
import CreateHollyTourismForm from '../../components/create-holly-tourism-form'

export default function HollyTourismForm() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm<IHollyTourismForm>()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { setImages, images } = useHollyTourismImage()
  const locale = localStorage.getItem('i18nextLng')
  const [language, setLanguage] = useState(
    locale === 'oz' ? 'uz-latin' : locale || 'en',
  )
  const { data } = useSingleHollyTourism(language)

  const { mutate: editMutate, isPending: editLoading } = useEditHollyTourism()
  const { mutate: createMutate, isPending: createLoading } =
    useCreateHollyTourism()

  useEffect(() => {
    setBreadCrumbs([
      { title: t('common.main'), href: '/' },
      { title: t('routes.content'), href: '/content' },
      {
        title: t('content.holly-tourism.title'),
        href: '/content/holly-tourism',
      },
    ])
  }, [])

  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname])
  const isCreate = useMemo(() => pathname.includes('/create'), [pathname])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        content: data?.content,
        title: data?.title,
        status: data?.status,
      })
      setImages(
        data?.images?.map(img => ({
          file: null,
          url: img.image,
          id: img?.id,
          is_main: img?.is_main,
        })),
      )
    }
  }, [data])

  const finishHandler = (values: IHollyTourismForm) => {
    const toSubmit = {
      ...values,
      status: values?.status || false,
    }

    const formData = new FormData()
    formData.append('title', transformImages(toSubmit.title))
    formData.append('content', transformImages(toSubmit.content))
    formData.append('status', String(toSubmit?.status))

    if (values.translate_all != null) {
      formData.append('translate_all', String(toSubmit.translate_all))
    }

    if (values.refresh_cache != null) {
      formData.append('refresh_cache', String(toSubmit.refresh_cache))
    }

    images.forEach((img, i) => {
      if (img?.file) {
        formData.append(`images[${i}]image`, img?.file)
        formData.append(`images[${i}]is_main`, String(img?.is_main))

        if (img?.resized) {
          formData.append(`images[${i}]resized_image`, img?.resized)
        }
      }
    })

    if (isEdit) {
      editMutate({ data: formData, language })
    } else if (isCreate) {
      createMutate(formData)
    }
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        {isEdit
          ? t('content.holly-tourism.title-edit')
          : isCreate
            ? t('content.holly-tourism.title-add')
            : ''}
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        className="flex gap-10"
        onFinish={finishHandler}
      >
        <div className="flex w-1/2 grow-0 basis-1/2 flex-col gap-6 rounded-2xl border bg-white p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            {t('content.top_destinations.add-content')}
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item name="content">
            <QuillEditor />
          </Form.Item>
        </div>
        <CreateHollyTourismForm language={language} setLanguage={setLanguage} />
      </Form>
      <Button
        size="large"
        type="primary"
        htmlType="submit"
        className="min-w-[150px] self-start"
        loading={editLoading || createLoading}
        onClick={() => {
          form?.submit()
        }}
      >
        {t('common.save')}
      </Button>
    </div>
  )
}
