import { useTranslation } from 'react-i18next'
import { Button, ConfigProvider, Form, Input, message, Typography } from 'antd'
import { useContext, useEffect } from 'react'
import { setCookie } from 'cookies-next'
import { useNavigate } from 'react-router'

import { darkTheme } from '@/providers/theme-provider'
import logo from '@/assets/logo.png'

import ViewIcon from '@/components/icons/view'
import ViewOffIcon from '@/components/icons/view-off'
import { AuthContext } from '../context/authContext'
import { useAuthContext } from '@/contexts/auth-context'

export default function SignIn(): React.ReactElement {
  const [form] = Form.useForm()
  const { setIsAuth } = useAuthContext()
  const authContext = useContext(AuthContext)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const authStore = authContext?.authStore || {
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userInfo: {},
  }

  const { isAuthenticated, login: loginAction }: any = authStore

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const handleSubmit = (values: { username: string; password: string }) => {
    const username = values.username?.trim()
    const password = values.password?.trim()

    if (username === 'milliybro' && password === 'milliybro') {
      const mockUser = {
        id: 1,
        username: 'milliybro',
        first_name: 'MilliyGo',
        last_name: 'SuperAdmin',
        is_superuser: true,
        role: 'superadmin',
      }

      localStorage.setItem('refresh', 'mock-refresh-token')
      localStorage.setItem('access', 'mock-access-token')
      localStorage.setItem('user', JSON.stringify(mockUser))

      loginAction(mockUser)
      setCookie('user', JSON.stringify(mockUser))
      setIsAuth(true)

      message.success(
        t('common.login-success') || 'Tizimga muvaffaqiyatli kirildi',
        2,
      )

      navigate('/')
      return
    }

    message.error(
      t('auth-page.login-failed') || 'Login yoki parol noto‘g‘ri',
      2,
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f9731620,transparent_35%),radial-gradient(circle_at_bottom,#2563eb20,transparent_30%)]" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <div className="w-full max-w-[560px] rounded-[28px] border border-white/10 bg-white/10 px-6 py-8 backdrop-blur-xl sm:px-10 sm:py-12">
          <div className="flex flex-col items-center">
            <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[22px] bg-white/10 ring-1 ring-white/10">
              <img
                src={logo}
                alt="MilliyGo logo"
                className="w-[120px] rounded-[16px]"
              />
            </div>

            <Typography.Text className="mb-3 text-center text-[30px] font-[700] leading-tight text-white">
              MilliyGo SuperAdmin
            </Typography.Text>

            <Typography.Text className="mb-8 max-w-[380px] text-center text-[15px] font-[400] text-white/70">
              Platformani boshqarish, foydalanuvchilarni nazorat qilish,
              statistikani ko‘rish va tizim sozlamalarini boshqarish uchun
              tizimga kiring.
            </Typography.Text>

            <ConfigProvider theme={darkTheme}>
              <Form
                form={form}
                layout="vertical"
                className="w-full"
                onFinish={handleSubmit}
              >
                <div className="mb-1">
                  <span className="text-sm text-white/90">
                    {t('fields.login.label') || 'Login'}
                  </span>
                </div>

                <Form.Item
                  name="username"
                  className="mb-4 [&_.ant-form-item-explain-error]:mt-1 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-required]:before:hidden"
                  rules={[
                    {
                      required: true,
                      message:
                        t('fields.login.validation-message-required') ||
                        'Login kiriting',
                    },
                  ]}
                >
                  <Input
                    placeholder={t('fields.login.placeholder') || 'Loginingiz'}
                    size="large"
                    className="!h-[52px] rounded-xl text-white focus:border-orange-500 focus:shadow-[0px_0px_0px_4px_rgba(249,115,22,0.20)] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_rgba(239,68,68,0.20)]"
                  />
                </Form.Item>

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/90">
                    {t('fields.password.label') || 'Parol'}
                  </span>

                  <button
                    type="button"
                    className="text-sm text-orange-400 transition hover:text-orange-300"
                    onClick={() => navigate('/reset')}
                  >
                    {t('auth-page.recovery-modal.title') ||
                      'Parolni unutdingizmi?'}
                  </button>
                </div>

                <Form.Item
                  name="password"
                  className="mb-6 [&_.ant-form-item-explain-error]:mt-1 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-required]:before:hidden"
                  rules={[
                    {
                      required: true,
                      message:
                        t('fields.password.validation-message-required') ||
                        'Parol kiriting',
                    },
                    {
                      min: 4,
                      message:
                        t('fields.password.validation-message-invalid') ||
                        'Parol kamida 4 ta belgidan iborat bo‘lishi kerak',
                    },
                  ]}
                >
                  <Input.Password
                    placeholder={
                      t('fields.password.placeholder') || 'Parolingiz'
                    }
                    size="large"
                    className="!h-[52px] rounded-xl text-white focus-within:border-orange-500 focus-within:shadow-[0px_0px_0px_4px_rgba(249,115,22,0.20)] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_rgba(239,68,68,0.20)] [&_.ant-input-password-icon]:text-white/70 [&_.ant-input-password-icon]:hover:text-orange-400"
                    classNames={{ suffix: 'text-white' }}
                    iconRender={visible =>
                      visible ? (
                        <ViewIcon className="text-white" />
                      ) : (
                        <ViewOffIcon className="text-white" />
                      )
                    }
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button
                    size="large"
                    className="!h-[54px] w-full rounded-xl border-none bg-orange-500 text-[15px] font-[600] text-white shadow-[0_10px_30px_rgba(249,115,22,0.28)] hover:!bg-orange-600 disabled:!bg-slate-500"
                    type="primary"
                    htmlType="submit"
                  >
                    {t('common.login-to-account') || 'Tizimga kirish'}
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/60">
              Demo login:{' '}
              <span className="font-semibold text-white">milliybro</span> / Demo
              parol: <span className="font-semibold text-white">milliybro</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <Typography.Text className="font-light text-white/50">
          Powered by
        </Typography.Text>

        <a
          href="https://milliyapp.uz/"
          target="_blank"
          rel="noreferrer"
          className="rounded-[8px]"
        >
          <Typography.Text className="font-medium text-white transition hover:text-orange-400">
            MilliyApp
          </Typography.Text>
        </a>
      </div>
    </div>
  )
}
