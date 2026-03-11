import { Avatar, Button, Flex, Modal, Popover, Space, Typography } from 'antd'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserCircleIcon from '../icons/user-circle'
import LogoutIcon from '../icons/login-icon'
import ResetPasswordIcon from '../icons/password-edit'
import ExitIcon from '../icons/exit-icon'
import { useNavigate } from 'react-router'
import getUserData from '@/utils/get-user-data'

const ChevronDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ProfilePopover = () => {
  const user = getUserData()
  const { t } = useTranslation()
  const [modalLogout, setModalLogout] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [cookies] = useCookies(['darkTheme'])
  const navigate = useNavigate()

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

  const popoverContent = (
    <div className="w-[196px] p-1">
      <Button
        size="middle"
        type="text"
        className="mb-0.5 flex w-full items-center justify-start gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-emerald-700"
        onClick={() => {
          setPopoverOpen(false)
          navigate('/reset')
        }}
        icon={<ResetPasswordIcon className="text-base text-emerald-700" />}
      >
        {t('common.edit-password')}
      </Button>
      <Button
        size="middle"
        type="text"
        className="flex w-full items-center justify-start gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 transition-all hover:bg-red-50 hover:text-red-600"
        onClick={() => {
          setPopoverOpen(false)
          setModalLogout(true)
        }}
        icon={<ExitIcon className="text-base" />}
      >
        {t('common.logout')}
      </Button>
    </div>
  )

  return (
    <>
      <Popover
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
        arrow={false}
        trigger="click"
        placement="bottomRight"
        styles={{
          body: {
            padding: 0,
            overflow: 'hidden',
            borderRadius: 14,
            boxShadow:
              '0 4px 6px -1px rgba(0,0,0,0.07), 0 10px 40px -4px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.06)',
          },
        }}
        content={popoverContent}
      >
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: popoverOpen ? 'rgba(99,102,241,0.06)' : 'transparent',
            border: '1px solid',
            borderColor: popoverOpen
              ? 'rgba(99,102,241,0.2)'
              : 'rgba(0,0,0,0.07)',
            borderRadius: 12,
            padding: '6px 10px 6px 6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {/* Avatar */}
          <Avatar
            shape="square"
            size={32}
            icon={<UserCircleIcon className="text-lg" />}
            src={user?.avatar}
            style={{
              borderRadius: 10,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 2px 8px rgba(102,126,234,0.4)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 13,
              color: 'white',
            }}
          />
          {/* Name + Role */}
          <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#0f172a',
                letterSpacing: '-0.01em',
              }}
            >
              Muhammad Ali
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
              SuperAdmin
            </div>
          </div>
          {/* Chevron */}
          <span
            style={{
              color: '#94a3b8',
              display: 'flex',
              transition: 'transform 0.2s',
              transform: popoverOpen ? 'rotate(180deg)' : 'none',
            }}
          >
            <ChevronDown />
          </span>
        </button>
      </Popover>

      {/* Logout Modal */}
      <Modal
        open={modalLogout}
        centered
        width={440}
        onOk={() => setModalLogout(false)}
        onCancel={() => setModalLogout(false)}
        classNames={{
          content: 'rounded-[20px] !p-10 [&>.ant-modal-close]:text-slate-400',
        }}
        footer={null}
      >
        <Flex vertical align="center" className="text-center">
          {/* Icon */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(239,68,68,0.08)',
              border: '6px solid rgba(239,68,68,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Avatar
              shape="circle"
              size={36}
              className="bg-transparent"
              src={<LogoutIcon className="text-[#ef4444]" color="#ef4444" />}
            />
          </div>

          <Typography.Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: 8,
              display: 'block',
            }}
          >
            {t('profile-popover.label')}
          </Typography.Text>

          <Typography.Text
            style={{
              fontSize: 14,
              color: '#64748b',
              lineHeight: 1.6,
              marginBottom: 28,
              display: 'block',
            }}
          >
            {t('profile-popover.description')}
          </Typography.Text>

          <Space size={10}>
            <Button
              size="large"
              onClick={() => setModalLogout(false)}
              style={{
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 13.5,
                border: '1px solid #e2e8f0',
                color: '#475569',
                height: 42,
              }}
            >
              {t('common.cancel')}
            </Button>
            <Button
              size="large"
              onClick={() => {
                setModalLogout(false)
                localStorage.removeItem('user')
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                window.location.reload()
              }}
              style={{
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 13.5,
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                border: 'none',
                color: 'white',
                height: 42,
                boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
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
