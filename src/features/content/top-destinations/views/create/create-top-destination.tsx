import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import { Button, Divider, Form, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import QuillEditor from '@/features/content/components/quill-editor'
import CreateTopDestinationForm from '../../components/create-top-destination-form'

export default function TopDestinationForm() {
  const { setBreadCrumbs } = useBreadCrumbsStore()
  const [form] = Form.useForm()
  const { t } = useTranslation()

  useEffect(() => {
    setBreadCrumbs([
      { title: 'Главная', href: '/' },
      { title: 'Контент', href: '/content/top-destinations' },
      { title: 'Лучшие направления' },
    ])
  }, [])

  return (
    <div className="mb-[200px] flex flex-col gap-5">
      <Typography.Title level={3} className="text-2xl font-semibold">
        Добавить лучшие направления
      </Typography.Title>
      <Form
        className="flex gap-10"
        form={form}
        layout="vertical"
        onFinish={values => console.log(values)}
        requiredMark={false}
      >
        <div className="flex w-1/2 grow-0 basis-1/2 flex-col gap-6 rounded-2xl border p-6">
          <Typography.Title level={5} className="mb-0 text-xl font-medium">
            Добавить контента
          </Typography.Title>
          <Divider className="m-0" />
          <Form.Item name="content" className="mb-0">
            <QuillEditor />
          </Form.Item>
        </div>
        <CreateTopDestinationForm />
      </Form>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="min-w-[150px] self-start"
        onClick={() => {
          form.submit()
        }}
      >
        {t('common.save')}
      </Button>
    </div>
  )
}
