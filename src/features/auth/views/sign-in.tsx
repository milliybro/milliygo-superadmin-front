import { useTranslation } from 'react-i18next'
import { Button, ConfigProvider, Form, Input, message, Typography } from 'antd'

import { darkTheme } from '@/providers/theme-provider'

import videoBanner from '@/assets/intro.mp4'
import uzinfocomLogo from '@/assets/uzinfocom-logo.png'

import ViewIcon from '@/components/icons/view'
import ViewOffIcon from '@/components/icons/view-off'
import ProjectLogo from '@/components/icons/project-logo'
import { login, withOneIdAuth } from '../api'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { setCookie } from 'cookies-next'
import { useNavigate, useSearchParams } from 'react-router'
import { AuthContext } from '../context/authContext'
import { useAuthContext } from '@/contexts/auth-context'
import OneIdIcon from '@/components/icons/one-id-icon'

// interface AuthStore {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
//   userInfo: Record<string, unknown>;
// }

export default function SignIn(): React.ReactElement {
  const [form] = Form.useForm()
  const { setIsAuth } = useAuthContext()
  const authContext = useContext(AuthContext)
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  console.log(userData, isLoading, openModal)

  const authStore = authContext?.authStore || {
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userInfo: {},
  }

  const { isAuthenticated, login: loginAction }: any = authStore
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { mutate: mutateLogin } = useMutation({
    mutationFn: login,
    onSuccess: res => {
      if (res.user.is_superuser === true) {
        localStorage.setItem('refresh', res.refresh)
        localStorage.setItem('access', res.access)
        localStorage.setItem('user', JSON.stringify(res.user))
        loginAction(res.user)
        setCookie('user', res.user)
        setIsAuth(true)
        navigate('/')

        message.success(t('common.login-success'), 2)
      } else {
        message.error(t('common.login-error'), 2)
      }
    },
  })

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) oneIdLogin({ code })
  }, [searchParams])

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const oneIdLogin = ({ code }: { code: string }) => {
    withOneIdAuth({ code })
      .then(res => {
        if (!res?.user) {
          localStorage.setItem('refresh', res.refresh)
          localStorage.setItem('access', res.access)
          localStorage.setItem('user', JSON.stringify(res.user))
          loginAction(res.user)
          setCookie('user', res.user)
          setIsAuth(true)
          navigate('/')

          setUserData(res.user)
        } else {
          localStorage.setItem('refresh', res.refresh)
          localStorage.setItem('access', res.access)
          localStorage.setItem('user', JSON.stringify(res.user))
          loginAction(res.user)
          setCookie('user', res.user)
          setIsAuth(true)

          message.success(t('user.login-success'), 2)
          navigate('/')
        }
      })
      .catch(error => {
        console.log(error)
        setOpenModal(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const oneIdUrl = 'https://sso.egov.uz/sso/oauth/Authorization.do?'

  const isProdDomain = window.location.hostname === 'admin.sayohat.uz'

  const redirectUri = isProdDomain
    ? 'https://admin.sayohat.uz/auth/sign-in'
    : 'https://admin.emehmon.xdevs.uz/auth/sign-in'

  const params = new URLSearchParams({
    redirect_uri: redirectUri,
    client_id: 'emehmon_platform',
    scope: 'emehmon_platform',
    response_type: 'one_code',
    state: 'test',
  }).toString()

  const handleOneId = () => {
    window.location.href = oneIdUrl + params
  }
  // const handleOneId = () => {
  //   const origin =
  //     typeof window !== 'undefined'
  //       ? window.location.origin === 'http://localhost:8090'
  //         ? 'https://sayohat.uz'
  //         : window.location.origin
  //       : ''

  //   const redirectUri = `${origin}/auth/sign-in`

  //   const params = queryString.stringify({
  //     redirect_uri: redirectUri,
  //     client_id: 'emehmon_platform',
  //     scope: 'emehmon_platform',
  //     response_type: 'one_code',
  //     state: 'test',
  //   })

  //   window.location.href = oneIdUrl + params
  // }
  const handleSubmit = (values: any) => {
    // if (
    //   values.username === 'statistics_adminq' &&
    //   values.password === 'admin123'
    // ) {
    //   const user = {
    //     id: 9999,
    //     username: 'statistics_admin@gmail.com',
    //     first_name: 'Statistics Admin',
    //     is_superuser: true,
    //     permissions: ['statistics_read', 'statistics_write'],
    //   }

    //   localStorage.setItem('user', JSON.stringify(user))
    //   localStorage.setItem('access', 'STATIC_ACCESS_TOKEN')
    //   localStorage.setItem('refresh', 'STATIC_REFRESH_TOKEN')

    //   loginAction(user)
    //   setCookie('user', user)
    //   setIsAuth(true)

    //   message.success('Muvaffaqiyatli tizimga kirdingiz!', 2)

    //   navigate('/')
    //   return
    // }

    mutateLogin(values)
  }

  return (
    <div className="h-[110vh] w-[100vw] lg:h-[100vh]">
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="absolute left-0 top-0 h-[110vh] w-full object-cover opacity-10 lg:h-full"
        poster="../main-banner.jpg"
      >
        <source
          src={videoBanner}
          width={1000}
          height={700}
          type="video/mp4"
          className="z-0"
        />
        Your browser does not support HTML5 video.
      </video>
      <div className="flex h-full w-full items-center justify-center bg-[#0F172A]">
        <div className="w-[569px] rounded-2xl border border-[#3F416B] bg-[#1E293B60] px-[70px] py-[70px] backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <ProjectLogo className="mb-6" />

            <Typography.Text className="mb-4 text-[28px] font-[600] text-white">
              {t('auth-page.welcome-title')}
            </Typography.Text>
            <Typography.Text className="mb-6 w-[360px] text-center text-[16px] font-[300] text-white">
              {t('auth-page.welcome-description')}
            </Typography.Text>

            <ConfigProvider theme={darkTheme}>
              <Form
                form={form}
                layout="vertical"
                className="mb-2 w-full"
                onFinish={handleSubmit}
              >
                <div className="flex flex-col">
                  <div className="mb-[10px]">
                    <span className="text-sm">{t('fields.login.label')}</span>
                  </div>
                  <Form.Item
                    name="username"
                    className="group mb-4 [&_.ant-form-item-explain-error]:my-1 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-label_label]:text-white [&_.ant-form-item-required]:before:hidden"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: t('fields.email.validation-message-required'),
                    //   },
                    //   {
                    //     type: 'email',
                    //     message: t('fields.email.validation-message-invalid'),
                    //   },
                    // ]}
                  >
                    <Input
                      placeholder={t('fields.login.placeholder')}
                      size="large"
                      className="text-white focus:border-primary focus:shadow-[0px_0px_0px_4px_#3B82F640] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440]"
                    />
                  </Form.Item>
                </div>

                <div className="flex flex-col">
                  <div className="mb-[10px] flex items-center justify-between">
                    <span className="text-sm">
                      {t('fields.password.label')}
                    </span>

                    {/* <SupportModal
                      icon={SquarePasswordIcon}
                      title={t('auth-page.recovery-modal.title')}
                      description={t('auth-page.recovery-modal.description')}
                    >
                      <button
                        type="button"
                        className="text-sm text-secondary"
                      >
                        {t('auth-page.recovery-modal.title')}
                      </button>
                    </SupportModal> */}
                    <button
                      type="button"
                      className="text-sm text-secondary"
                      onClick={() => navigate('/reset')}
                    >
                      {t('auth-page.recovery-modal.title')}
                    </button>
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
                      placeholder={t('fields.password.placeholder')}
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
                    className="w-full border-none bg-[#2563EB] hover:bg-primary/50 disabled:bg-secondary disabled:text-white"
                    type="primary"
                    htmlType="submit"
                    // loading={isLoading}
                  >
                    {t('common.login-to-account')}
                  </Button>
                </Form.Item>

                <div className="flex w-full items-center gap-3 py-6">
                  <span className="h-px flex-1 bg-[#FFFFFF33]" />
                  <span className="text-[16px] font-[400] text-white">
                    {t('common.or')}
                  </span>
                  <span className="h-px flex-1 bg-[#FFFFFF33]" />
                </div>
              </Form>
              <Button
                aria-label={t('auth.continue-with-one-id')}
                size="large"
                type="primary"
                shape="default"
                className="mb-4 flex !h-[56px] w-full items-center justify-between bg-[#4825C2] text-[14px] font-[500] shadow-none"
                onClick={handleOneId}
              >
                {t('common.one-id')}
                <div className="p-0">
                  <OneIdIcon className="text-[80px]" />
                </div>
              </Button>
            </ConfigProvider>

            {/* <SupportModal
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
            </SupportModal> */}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[16px] left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-[24px] md:bottom-[24px] xl:bottom-[24px]">
        <Typography.Text className="font-light text-white/50">
          Powered by
        </Typography.Text>
        <a href="https://uzinfocom.uz/" target="_blank" rel="noreferrer">
          <img src={uzinfocomLogo} alt="uzinfocom logo" className="w-[120px]" />
        </a>
      </div>
    </div>
  )
}
