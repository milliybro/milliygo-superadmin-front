import ProjectLogo from "@/components/icons/project-logo"
import { darkTheme } from "@/providers/theme-provider"
import { Button, ConfigProvider, Form, Input, Typography } from "antd"
import { useTranslation } from "react-i18next"

function EmailStep({ nextStep }: { nextStep: () => void }) {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  const onFinish = (values: any) => {
    console.log('email sent:', values)
    nextStep()
  }

  return (
    <>
      <ProjectLogo className="mb-6" />
      <Typography.Text className="mb-4 text-[28px] font-semibold text-white">
        {t('common.reset-password')}
      </Typography.Text>
      <Typography.Text className="mb-6 w-[400px] text-center text-base font-light text-white">
        {t('common.edit-password-text')}
      </Typography.Text>

      <ConfigProvider theme={darkTheme}>
        <Form form={form} layout="vertical" className="mb-6 w-full" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('fields.email.validation-message-required') },
              { type: 'email', message: t('fields.email.validation-message-invalid') },
            ]}
          >
            <Input placeholder={t('fields.email.placeholder')} size="large" className="text-white" />
          </Form.Item>

          <Button htmlType="submit" size="large" className="w-full bg-primary text-white">
            {t('common.receive-code')}
          </Button>
        </Form>
      </ConfigProvider>
    </>
  )
}
export default EmailStep