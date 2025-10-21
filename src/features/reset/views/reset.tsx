import { useTranslation } from 'react-i18next'
import { Button, ConfigProvider, Form, Input, Typography } from 'antd'
import { darkTheme } from '@/providers/theme-provider'
import videoBanner from '@/assets/intro.mp4'
import uzinfocomLogo from '@/assets/uzinfocom-logo.png'
import ProjectLogo from '@/components/icons/project-logo'
import { confirmEmail, confirmPassword, resetEmail } from '../api'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../context/authContext'
import { OTPProps } from 'antd/es/input/OTP'
import ViewOffIcon from '@/components/icons/view-off'
import ViewIcon from '@/components/icons/view'

export default function ResetPassword(): React.ReactElement {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [form] = Form.useForm()
  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore || {
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userInfo: {},
  }

  const { isAuthenticated }: any = authStore
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate: emailReset, isPending } = useMutation({
    mutationFn: resetEmail,
    onSuccess: (_, variables) => {
      setEmail(variables.email)
      nextStep()
    },
  })

  const { mutate: emailConfirm, isPending: resetPending } = useMutation({
    mutationFn: confirmEmail,
    onSuccess: res => {
      nextStep()
    },
  })

  const { mutate: passwordConfirm, isPending: passwordPending } = useMutation({
    mutationFn: confirmPassword,
    onSuccess: res => {
      localStorage.removeItem('user')
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      navigate('/auth/sign-in')
      window.location.reload()
    },
  })

  if (isAuthenticated) {
    navigate('/')
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3) as 1 | 2 | 3)

  const [email, setEmail] = useState<string>('')

  const onEmailFinish = (values: { email: string }) => {
    emailReset(values)
  }

  const onCodeFinish = (values: { code: string }) => {
    emailConfirm({ ...values, email })
  }

  const onPasswordFinish = (values: { password: string; confirm: string }) => {
    passwordConfirm({ ...values, email })
  }

  return (
    <div className="relative h-[100vh] w-[100vw]">
      <video
        autoPlay
        muted
        loop
        className="absolute left-0 top-0 h-full w-full object-cover opacity-10"
      >
        <source src={videoBanner} type="video/mp4" />
      </video>

      <div className="flex h-full w-full items-center justify-center bg-[#0F172A]">
        <div className="w-[569px] rounded-2xl border border-[#3F416B] bg-[#1E293B99] p-[70px] backdrop-blur-sm">
          {step === 1 && (
            <div className="flex flex-col items-center">
              <ProjectLogo className="mb-6" />

              <Typography.Text className="mb-4 text-[1.75rem] font-semibold text-white">
                {t('common.reset-password')}
              </Typography.Text>
              <Typography.Text className="mb-6 w-[400px] text-center text-base font-light text-[#B7BFD5]">
                {t('common.edit-password-text')}
              </Typography.Text>

              <ConfigProvider theme={darkTheme}>
                <Form
                  form={form}
                  layout="vertical"
                  className="mb-6 w-full"
                  onFinish={onEmailFinish}
                >
                  <div className="flex flex-col">
                    <Form.Item
                      name="email"
                      className="group mb-4 [&_.ant-form-item-explain-error]:my-1 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-label_label]:text-white [&_.ant-form-item-required]:before:hidden"
                      label={t('fields.email.label')}
                      rules={[
                        {
                          required: true,
                          message: t(
                            'fields.email.validation-message-required',
                          ),
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
                        className="text-white focus:border-primary focus:shadow-[0px_0px_0px_4px_#3B82F640] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440]"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item>
                    <Button
                      size="large"
                      className="w-full border-none bg-primary hover:bg-primary/50 disabled:bg-secondary disabled:text-white"
                      type="primary"
                      htmlType="submit"
                      loading={isPending}
                    >
                      {t('common.receive-code')}
                    </Button>
                  </Form.Item>
                  <Link className="flex-center mt-6 flex justify-center" to="/">
                    Отменить процесс
                  </Link>
                </Form>
              </ConfigProvider>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center">
              <ProjectLogo className="mb-6" />

              <Typography.Text className="mb-4 text-[1.75rem] font-semibold text-white">
                {t('common.confirmation')}
              </Typography.Text>
              <Typography.Text className="mb-6 w-[400px] text-center text-base font-light text-[#B7BFD5]">
                {t('common.edit-password-text')}
              </Typography.Text>

              <ConfigProvider theme={darkTheme}>
                <Form
                  form={form}
                  layout="vertical"
                  className="mb-6 w-full"
                  onFinish={onCodeFinish}
                >
                  <div className="custom-otp flex flex-col">
                    <div className="mb-1">
                      <span className="text-sm">{t('common.code')}</span>
                    </div>
                    <Form.Item
                      name="code"
                      className="group mb-4 w-full [&_.ant-otp]:w-full"
                    >
                      <Input.OTP
                        length={4}
                        className="w-full [&_.ant-input]:flex-1"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item>
                    <Button
                      size="large"
                      className="w-full border-none bg-primary hover:bg-primary/50 disabled:bg-secondary disabled:text-white"
                      type="primary"
                      htmlType="submit"
                      loading={resetPending}
                    >
                      {t('common.receive-code')}
                    </Button>
                  </Form.Item>
                  <Link className="flex-center mt-6 flex justify-center" to="/">
                    Отменить процесс
                  </Link>
                </Form>
              </ConfigProvider>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center">
              <ProjectLogo className="mb-6" />

              <Typography.Text className="mb-4 text-[1.75rem] font-semibold text-white">
                {t('common.create-password')}
              </Typography.Text>
              <Typography.Text className="mb-6 w-[400px] text-center text-base font-light text-[#B7BFD5]">
                {t('common.create-password-desc')}
              </Typography.Text>

              <ConfigProvider theme={darkTheme}>
                <Form
                  form={form}
                  layout="vertical"
                  className="mb-6 w-full"
                  onFinish={onPasswordFinish}
                >
                  <div className="flex flex-col">
                    <div className="mb-1">
                      <span className="text-sm">
                        {t('common.new-password')}
                      </span>
                    </div>
                    <Form.Item
                      name="password"
                      className="[&_.ant-form-item-label label]:!w-full mb-6 [&_.ant-form-item-explain-error]:mb-4 [&_.ant-form-item-explain-error]:mt-1 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-label_label]:text-white [&_.ant-form-item-required]:before:hidden"
                      rules={[
                        {
                          required: true,
                          message: t(
                            'fields.password.validation-message-required',
                          ),
                        },
                        {
                          min: 4,
                          message: t(
                            'fields.password.validation-message-invalid',
                          ),
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder={t('hotels-page.password.placeholder')}
                        size="large"
                        className="text-white focus-within:border-primary focus-within:shadow-[0px_0px_0px_4px_#3B82F640] focus:border-primary focus:shadow-[0px_0px_0px_4px_#3B82F640] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440] [&_.ant-input-password-icon]:text-white [&_.ant-input-password-icon]:hover:text-primary"
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
                  <div className="flex flex-col">
                    <div className="mb-1">
                      <span className="text-sm">
                        {t('common.confirm-password')}
                      </span>
                    </div>
                    <Form.Item
                      name="confirm-password"
                      className="[&_.ant-form-item-label label]:!w-full mb-6 [&_.ant-form-item-explain-error]:mb-4 [&_.ant-form-item-explain-error]:mt-1 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-label_label]:text-white [&_.ant-form-item-required]:before:hidden"
                      rules={[
                        {
                          required: true,
                          message: t(
                            'fields.password.validation-message-required',
                          ),
                        },
                        {
                          min: 4,
                          message: t(
                            'fields.password.validation-message-invalid',
                          ),
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder={t('hotels-page.password.placeholder')}
                        size="large"
                        className="text-white focus-within:border-primary focus-within:shadow-[0px_0px_0px_4px_#3B82F640] focus:border-primary focus:shadow-[0px_0px_0px_4px_#3B82F640] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440] [&_.ant-input-password-icon]:text-white [&_.ant-input-password-icon]:hover:text-primary"
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
                      className="w-full border-none bg-primary hover:bg-primary/50 disabled:bg-secondary disabled:text-white"
                      type="primary"
                      htmlType="submit"
                      loading={passwordPending}
                    >
                      {t('common.save-password')}
                    </Button>
                  </Form.Item>
                  <Link className="flex-center mt-6 flex justify-center" to="/">
                    Отменить процесс
                  </Link>
                </Form>
              </ConfigProvider>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-[48px] left-[calc(50%-109px)] flex items-center gap-2">
        <Typography.Text className="font-light text-white/50">
          Powered by
        </Typography.Text>
        <a href="/">
          <img src={uzinfocomLogo} alt="uzinfocom logo" className="w-[120px]" />
        </a>
      </div>
    </div>
  )
}
