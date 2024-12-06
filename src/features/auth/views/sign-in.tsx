import { useTranslation } from 'react-i18next'
import { Button, ConfigProvider, Form, Input, Typography } from 'antd'

import { darkTheme } from '@/providers/theme-provider'

import videoBanner from '@/assets/main-bg-video.mp4'
import uzinfocomLogo from '@/assets/uzinfocom-logo.png'

import SupportModal from '../components/support-modal'

import ViewIcon from '@/components/icons/view'
import ViewOffIcon from '@/components/icons/view-off'
import ProjectLogo from '@/components/icons/project-logo'
import SquarePasswordIcon from '@/components/icons/square-password'
import CustomerSupportIcon from '@/components/icons/customer-support'

export default function SignIn(): React.ReactElement {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  const mutate = () => {}
  return (
    <div className="w-[100vw] h-[100vh]">
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="absolute top-0 left-0 w-full object-cover h-full opacity-10"
        poster="../main-banner.jpg"
      >
        <source
          src={videoBanner}
          width={1000}
          height={500}
          type="video/mp4"
          className="z-0"
        />
        Your browser does not support HTML5 video.
      </video>
      <div className="bg-[#0F172A] w-full h-full flex items-center justify-center">
        <div className="w-[569px] border border-[#3F416B] rounded-2xl backdrop-blur-sm bg-[#1E293B99] p-[100px]">
          <div className="flex flex-col items-center">
            <ProjectLogo className="mb-6" />

            <Typography.Text className="text-[28px] text-white font-semibold mb-4">
              {t('auth-page.welcome-title')}
            </Typography.Text>
            <Typography.Text className=" font-light text-white text-center text-base mb-6">
              {t('auth-page.welcome-description')}
            </Typography.Text>

            <ConfigProvider theme={darkTheme}>
              <Form
                form={form}
                layout="vertical"
                className="w-full mb-6"
                onFinish={mutate}
              >
                <div className="flex flex-col">
                  <div className="mb-1">
                    <span className="text-[14px]">
                      {t('fields.email.label')}
                    </span>
                  </div>
                  <Form.Item
                    name="username"
                    className="[&_.ant-form-item-label_label]:text-white group mb-4 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-explain-error]:my-1 [&_.ant-form-item-required]:before:hidden"
                    rules={[
                      {
                        required: true,
                        message: t('fields.email.validation-message-required'),
                      },
                      {
                        type: 'email',
                        message: t('fields.email.validation-message-invalid'),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('fields.email.placeholder')}
                      size="large"
                      className="text-white focus:border-primary [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440] focus:shadow-[0px_0px_0px_4px_#3B82F640]"
                    />
                  </Form.Item>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center mb-1 justify-between">
                    <span className="text-[14px]">
                      {t('fields.password.label')}
                    </span>

                    <SupportModal
                      icon={SquarePasswordIcon}
                      title={t('auth-page.recovery-modal.title')}
                      description={t('auth-page.recovery-modal.description')}
                    >
                      <button
                        type="button"
                        className="text-[14px] text-secondary"
                      >
                        {t('auth-page.recovery-modal.title')}
                      </button>
                    </SupportModal>
                  </div>
                  <Form.Item
                    name="password"
                    className="[&_.ant-form-item-label_label]:text-white [&_.ant-form-item-label label]:!w-full [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-explain-error]:mt-1 [&_.ant-form-item-explain-error]:mb-4 mb-6 [&_.ant-form-item-required]:before:hidden"
                    rules={[
                      {
                        required: true,
                        message: t(
                          'fields.password.validation-message-required',
                        ),
                      },
                      {
                        min: 5,
                        message: t(
                          'fields.password.validation-message-invalid',
                        ),
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={t('fields.password.placeholder')}
                      size="large"
                      className="text-white [&_.ant-input-password-icon]:text-white  [&_.ant-input-password-icon]:hover:text-primary focus:border-primary focus-within:border-primary focus:shadow-[0px_0px_0px_4px_#3B82F640] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440] focus-within:shadow-[0px_0px_0px_4px_#3B82F640]"
                      classNames={{ suffix: 'text-white' }}
                      iconRender={visible =>
                        !visible ? (
                          <ViewOffIcon className="text-white" />
                        ) : (
                          <ViewIcon className="text-white" />
                        )
                      }
                    />
                  </Form.Item>
                </div>

                <Form.Item>
                  <Button
                    size="large"
                    className="w-full bg-primary hover:bg-primary/50 border-none disabled:bg-secondary disabled:text-white"
                    type="primary"
                    htmlType="submit"
                    // loading={isLoading}
                  >
                    {t('common.login-to-account')}
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>

            <SupportModal
              icon={CustomerSupportIcon}
              title={t('auth-page.support-modal.title')}
              description={t('auth-page.support-modal.description')}
            >
              <button
                type="button"
                className="text-sm text-white duration-200 hover:text-primary flex items-center leading-3 gap-2"
              >
                <CustomerSupportIcon />{' '}
                {t('auth-page.support-modal.contact-support')}
              </button>
            </SupportModal>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 absolute bottom-[48px] left-[calc(50%-109px)]">
        <Typography.Text className="text-white/50 font-light">
          Powered by
        </Typography.Text>
        <a href="/">
          <img src={uzinfocomLogo} alt="uzinfocom logo" className="w-[120px]" />
        </a>
      </div>
    </div>
  )
}
