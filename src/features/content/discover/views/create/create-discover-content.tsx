import QuillEditor from '@/features/content/components/quill-editor'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { Button, Divider, Form, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import CreateDiscoverForm from '../../components/create-discover-form'
import { useDiscoverContext } from '../../hooks/use-discover-context'
import { useDiscoverImage } from '../../hooks/use-discover-image'
import { ICreateDiscoverForm } from '../../types'

export default function CreateDiscoverContent() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm<ICreateDiscoverForm>()
  const { singleDiscover, editDiscovery, createDiscovery } =
    useDiscoverContext()

  const { pathname } = useLocation()
  const { image, setImage, removeImage } = useDiscoverImage()

  const { t } = useTranslation()

  useEffect(() => {
    removeImage()

    return () => {
      removeImage()
    }
  }, [])

  useEffect(() => {
    if (singleDiscover?.data) {
      form.setFieldsValue({
        name: singleDiscover.data.name || '',
        content: singleDiscover.data.content || '',
        description: singleDiscover.data.description || '',
        status: singleDiscover.data.status,
        social_links: singleDiscover.data.social_links.map(item => ({
          platform: item.platform,
          url: item.url,
        })),
      })

      if (singleDiscover.data.image) {
        setImage({
          file: null,
          url: singleDiscover.data.image,
        })
      }
    }
  }, [singleDiscover])

  useEffect(() => {
    setBreadCrumbs([
      {
        title: t('common.main'),
        href: '/',
      },
      {
        title: t('routes.content'),
        href: '/content/discover-uzbekistan',
      },
      {
        title: t('content.discover.title'),
        href: '/content/discover-uzbekistan',
      },
      {
        title: pathname.includes('create')
          ? t('common.create')
          : t('common.edit'),
      },
    ])
  }, [])

  const finishHandler = (values: ICreateDiscoverForm) => {
    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('content', values.content)
    formData.append('status', String(values.status))

    if (image?.file) {
      formData.append('image[image]', image.file)

      if (image?.resized) formData.append('image[resized]', image.resized)
    }

    values?.social_links?.map((item: any, i: number) => {
      formData.append(`social_links[${i}]platform`, item.platform)
      formData.append(`social_links[${i}]url`, item.url)
    })

    if (pathname.includes('edit')) {
      editDiscovery.mutate(formData)
    } else if (pathname.includes('create')) {
      createDiscovery.mutate(formData)
    }
  }

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        {t('content.discover.add')}
      </Typography.Title>
      <Form
        className="flex gap-10"
        form={form}
        layout="vertical"
        onFinish={finishHandler}
        id="create-discover-form"
      >
        <div className="flex w-full grow-0 basis-1/2 flex-col gap-6 rounded-2xl border bg-white p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            {t('content.add-content')}
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
