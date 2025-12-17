import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CloseIcon from '@/components/icons/close-icon'
import { Button, notification, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

type Props = {
  edit?: string | number | null | undefined
  title?: string
  description?: string
}

function useNotify() {
  const [notify, notificationPlace] = notification.useNotification()
  const { t } = useTranslation()

  const openNotify = ({ edit }: Props) => {
    notify.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-2xl text-primary" />,
      message: (
        <Typography.Text className="text-lg font-semibold leading-[22.95px]">
          {edit ? t('Muvaffaqiyatli tahrirlandi') : t('Muvaffaqiyatli yaratildi')}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="absolute right-[10px] top-[10px] grid place-items-center rounded-lg"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notify.destroy()}
          />
          <Typography.Text className="text-base text-secondary">
            {edit ? t('O‘zgarishlar muvaffaqiyatli saqlandi') : t("Ma'lumot muvaffaqiyatli saqlandi")}
          </Typography.Text>
        </div>
      ),
    })
  }

  return { openNotify, notificationPlace ,notify}
}

export default useNotify
