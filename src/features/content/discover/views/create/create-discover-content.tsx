import QuillEditor from '@/features/content/components/quill-editor'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { Button, Divider, Form, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import CreateDiscoverForm from '../../components/create-discover-form'
import { useDiscoverContext } from '../../hooks/use-discover-context'
import { useDiscoverImage } from '../../hooks/use-discover-image'

export default function CreateDiscoverContent() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm()
  const { singleDiscover, editDiscovery, createDiscovery } =
    useDiscoverContext()

  const { pathname } = useLocation()
  const { image } = useDiscoverImage()

  const { t } = useTranslation()

  useEffect(() => {
    if (singleDiscover?.data) {
      form.setFieldsValue({
        title: singleDiscover.data.name,
      })
    }
  }, [singleDiscover])

  useEffect(() => {
    setBreadCrumbs([
      {
        title: 'Главная',
        href: '/',
      },
      {
        title: 'Контент',
        href: '/content/discover-uzbekistan',
      },
      {
        title: 'Откройте Узбекистан вместе с нами',
        href: '/content/discover-uzbekistan',
      },
      {
        title: pathname.includes('create') ? 'Создать' : 'Редактировать',
      },
    ])
  }, [])

  const finishHandler = (values: any) => {
    const translations = {
      ru: {
        title: values.title,
        description: values.description,
        content: values.content,
      },
    }

    const submittingData = {
      translations: JSON.stringify(translations),
      image: image?.file,
    }

    if (pathname.includes('edit')) {
      editDiscovery.mutate(submittingData)
    } else if (pathname.includes('create')) {
      createDiscovery.mutate(submittingData)
    }
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить Узбекистан вместе с нами
      </Typography.Title>
      <Form
        className="flex gap-10"
        form={form}
        layout="vertical"
        onFinish={finishHandler}
        id="create-discover-form"
      >
        <div className="flex w-full grow-0 basis-1/2 flex-col gap-6 rounded-2xl border p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            Добавить контента
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item name="content">
            <QuillEditor />
          </Form.Item>
        </div>
        <CreateDiscoverForm />
      </Form>
      <Button
        type="primary"
        size="large"
        className="w-[200px]"
        form="create-discover-form"
        htmlType="submit"
        loading={editDiscovery.isLoading || createDiscovery.isLoading}
      >
        {t('common.save')}
      </Button>
    </div>
  )
}
