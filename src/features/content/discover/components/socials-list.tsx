import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'

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
                  { required: true, message: 'Пожалуйста, выберите платформу' },
                ]}
              >
                <Select
                  placeholder="Выберите платформу"
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
                  { required: true, message: 'URL является обязательным' },
                  { type: 'url', message: 'Введите действительный URL' },
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
            Добавить социальную ссылку
          </Button>
        </>
      )}
    </Form.List>
  )
}
