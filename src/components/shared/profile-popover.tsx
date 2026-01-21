import {
  Avatar,
  Button,
  Flex,
  Modal,
  Popover,
  Space,
  // Tag,
  Typography,
} from 'antd'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowDownIcon from '../icons/arrow-down'
import UserCircleIcon from '../icons/user-circle'
import getUserData from '@/utils/get-user-data'
import LogoutIcon from '../icons/login-icon'
import ResetPasswordIcon from '../icons/password-edit'
import ExitIcon from '../icons/exit-icon'
import { useNavigate } from 'react-router'

const ProfilePopover = () => {
  const user = getUserData()
  const { t } = useTranslation()
  const [modalLogout, setModalLogout] = useState(false)
  const [cookies] = useCookies(['darkTheme'])
  const navigate = useNavigate()

  // const changeThemeHandler = (val: boolean) => {
  //   setCookie('darkTheme', val)
  // }

  useEffect(() => {
    if (cookies.darkTheme) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

    document.documentElement.style.overflow = 'hidden'

    void document.body.clientWidth

    document.documentElement.setAttribute(
      'data-color-scheme',
      cookies.darkTheme ? 'dark' : 'light',
    )
    document.documentElement.style.overflow = ''
  }, [cookies.darkTheme])

  return (
    <>
      <Popover
        arrow={false}
        trigger="click"
        placement="bottomRight"
        className="shrink-0 overflow-hidden"
        styles={{
          body: {
            padding: 0,
            overflow: 'hidden',
          },
        }}
        content={
          <>
            <Button
              size="large"
              type="text"
              className="flex w-full items-center justify-start font-medium hover:bg-[#F8F8FA]"
              onClick={() => navigate('/reset')}
            >
              <ResetPasswordIcon className="text-xl text-[#115E59]" />
              {t('common.edit-password')}
            </Button>
            <Button
              size="large"
              type="text"
              className="flex items-center justify-start font-medium hover:bg-[#F8F8FA]"
              onClick={() => setModalLogout(true)}
            >
              <ExitIcon className="text-xl" />
              {t('common.logout')}
            </Button>
          </>
        }
      >
        <button
          type="button"
          className="group flex select-none items-center text-sm font-semibold leading-[19.12px] text-primary-dark hover:bg-transparent dark:text-white"
        >
          <Avatar
            shape="square"
            size={38}
            icon={<UserCircleIcon className="text-2xl" />}
            src={user?.avatar}
            className="mr-4 bg-secondary-light font-normal text-primary-dark dark:bg-white/5 dark:text-white"
          />
          {user?.first_name + ' ' + user?.last_name}
          <ArrowDownIcon className="ml-2 text-base" />
        </button>
      </Popover>
      <Modal
        open={modalLogout}
        centered
        width={515}
        onOk={() => setModalLogout(false)}
        onCancel={() => setModalLogout(false)}
        classNames={{
          content:
            'p-[40px] [&>.ant-modal-close]:text-primary-dark dark:[&>.ant-modal-close]:text-dark-bg',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          <Avatar
            shape="circle"
            size={62}
            className="mb-5 border-[7px] border-danger/5 bg-danger/20"
            src={<LogoutIcon className="text-[#ff0000]" color="#ff0000" />}
          />
          <Typography.Text className="mb-[10px] text-2xl font-bold leading-[30.6px]">
            {t('profile-popover.label')}
          </Typography.Text>
          <Typography.Text className="mb-[20px] leading-[25.6px] text-secondary">
            {t('profile-popover.description')}
          </Typography.Text>
          <Space>
            <Button
              className="font-semibold"
              onClick={() => setModalLogout(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              className="bg-primary-dark font-semibold text-white dark:bg-dark-bg"
              onClick={() => {
                setModalLogout(false)
                localStorage.removeItem('user')
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                window.location.reload()
              }}
            >
              {t('common.logout')}
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

export default ProfilePopover
