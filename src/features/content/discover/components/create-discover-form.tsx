import { Divider, Form, Input, Switch, Tag, Typography } from 'antd'
import DiscoverGallery from './discover-gallery'
import SocialsList from './socials-list'
import { useTranslation } from 'react-i18next'

export default function CreateDiscoverForm() {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const status = Form.useWatch('status', form)

  return (
    <div className="flex w-full flex-shrink-0 basis-1/2 flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border p-6">
        <Typography.Title level={5} className="text-xl font-medium">
          Предпросмотр
        </Typography.Title>
        <Divider className="m-0" />
        <Form.Item name="name" label="Название">
          <Input placeholder="Введите название" size="large" />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea
            rows={6}
            placeholder="Введите короткое описание"
            size="large"
          />
        </Form.Item>
        <div className="flex items-end gap-5">
          <Form.Item label={t('fields.status.label')} name="status">
            <Switch />
          </Form.Item>
          <Tag color={status ? 'green' : 'red'} className="px-2 py-2 text-sm">
            {status ? t('common.active') : t('common.inactive')}
          </Tag>
        </div>
        <Typography.Text className="select-none text-sm">
          Социальные ссылки
        </Typography.Text>
        <SocialsList />
        <DiscoverGallery />
      </div>
    </div>
  )
}
