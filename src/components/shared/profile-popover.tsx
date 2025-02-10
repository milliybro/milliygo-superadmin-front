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
import useUserData from '@/hooks/use-user-data'

const ProfilePopover = () => {
    const user = useUserData()
  const { t } = useTranslation()
  const [modalLogout, setModalLogout] = useState(false)
  const [cookies] = useCookies(['darkTheme'])

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
        overlayClassName="z-[10]"
        overlayInnerStyle={{
          padding: 0,
          overflow: 'hidden',
          // width: 347,
        }}
        content={
          <Button
            size="large"
            type="text"
            danger
            className="flex items-center justify-start font-medium hover:bg-danger/20"
            onClick={() => setModalLogout(true)}
          >
            {/* <LogoutIcon className="text-[20px]" /> */}
            {t('common.logout')}
          </Button>
        }
      >
         <button
          type="button"
          className="flex items-center select-none group font-semibold hover:bg-transparent text-primary-dark dark:text-white text-[15px] leading-[19.12px]"
        >
          <Avatar
            shape="square"
            size={46}
            icon={<UserCircleIcon className="text-[24px]" />}
            src={user?.avatar}
            className="bg-secondary-light mr-4 text-primary-dark dark:text-white dark:bg-white/5 font-normal"
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
            className=" bg-danger/20 mb-5 border-[7px] border-danger/5"
          />
          <Typography.Text className="text-[24px] font-bold leading-[30.6px] mb-[10px]">
            {t('profile-popover.label')}
          </Typography.Text>
          <Typography.Text className="text-secondary leading-[25.6px] mb-[20px]">
            {t('profile-popover.description')}
          </Typography.Text>
          <Space>
            <Button
              className=" font-semibold"
              onClick={() => setModalLogout(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              className="bg-primary-dark dark:bg-dark-bg text-white font-semibold"
              onClick={() => {
                setModalLogout(false)
                localStorage.clear()
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
