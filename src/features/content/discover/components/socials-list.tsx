import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import { useTranslation } from 'react-i18next'

const SOCIAL_PLATFORMS = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Telegram', value: 'telegram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Website', value: 'website' },
]

export default function SocialsList() {
  const form = Form.useFormInstance()
  const { t } = useTranslation()
  const socials = Form.useWatch('social_links', form)
  const selectedSocials: string[] = socials?.map((item: any) => item?.platform)

  return (
    <Form.List name="social_links">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, i) => (
            <Space key={key} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'platform']}
                rules={[
                  {
                    required: true,
                    message: t('fields.social_platform.error'),
                  },
                ]}
              >
                <Select
                  placeholder={t('fields.social_platform.placeholder')}
                  options={SOCIAL_PLATFORMS?.filter(
                    v =>
                      !selectedSocials?.includes(v.value) ||
                      socials?.[i]?.platform === v.value,
                  )}
                />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'url']}
                rules={[
                  { required: true, message: t('fields.social_url.error') },
                  { type: 'url', message: t('fields.social_url.error-2') },
                ]}
              >
                <Input placeholder="https://example.com" />
              </Form.Item>

              <MinusCircleOutlined
                className="text-danger"
                onClick={() => remove(name)}
              />
            </Space>
          ))}

          <Button
            type="dashed"
            onClick={() => add()}
            icon={<PlusOutlined />}
            className="w-full"
          >
            {t('content.discover.add-social')}
          </Button>
        </>
      )}
    </Form.List>
  )
}
