import { Divider, Form, Input, Switch, Tag, Typography } from 'antd'
import DiscoverGallery from './discover-gallery'
import SocialsList from './socials-list'
import { useTranslation } from 'react-i18next'

export default function CreateDiscoverForm() {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const status = Form.useWatch('status', form)

  return (
    <div className="flex w-full flex-grow-0 basis-1/2 flex-col gap-4 rounded-2xl border bg-white p-6">
      <Typography.Title level={5} className="text-xl font-medium">
        {t('common.preview')}
      </Typography.Title>
      <Divider className="m-0" />
      <Form.Item name="name" label={t('fields.name.label')}>
        <Input placeholder={t('fields.name.placeholder')} size="large" />
      </Form.Item>
      <Form.Item name="description" label={t('fields.description.label')}>
        <Input.TextArea
          rows={6}
          placeholder={t('fields.description.placeholder')}
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
        {t('content.discover.social-links')}
      </Typography.Text>
      <SocialsList />
      <DiscoverGallery />
    </div>
  )
}
