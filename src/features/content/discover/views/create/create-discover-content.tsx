import QuillEditor from '@/features/content/components/quill-editor'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { Button, Divider, Form, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import CreateDiscoverForm from '../../components/create-discover-form'
import { useDiscoverContext } from '../../hooks/use-discover-context'

export default function CreateDiscoverContent() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm()
  const { singleDiscover, content, setContent } = useDiscoverContext()

  const { t } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    if (singleDiscover?.data) {
      setContent(singleDiscover.data.content || '')
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

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить Узбекистан вместе с нами
      </Typography.Title>
      <div className="flex gap-10">
        <div className="flex w-full grow-0 basis-1/2 flex-col gap-6 rounded-2xl border p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            Добавить контента
          </Typography.Title>
          <Divider className="m-0" />
          <QuillEditor value={content} onChange={setContent} />
        </div>
        <CreateDiscoverForm form={form} />
      </div>
      <Button
        type="primary"
        size="large"
        className="w-[200px]"
        form="create-discover-form"
        htmlType="submit"
      >
        {t('common.save')}
      </Button>
    </div>
  )
}
