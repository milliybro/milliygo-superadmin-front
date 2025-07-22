import { useTranslation } from 'react-i18next'
import { Avatar, Badge, Button, Divider, Popover, Typography } from 'antd'

import NotificationIcon from '../icons/notification'

const { Text } = Typography

const NotificationPopover = () => {
  const { t } = useTranslation()

  return (
    <Popover
      arrow={false}
      trigger="click"
      placement="bottomRight"
      styles={{ body: { padding: 0, overflow: 'hidden', width: 390 } }}
      className="shrink-0"
      content={
        <div className="flex flex-col">
          <div className="p-5 text-sm font-medium leading-[20px]">
            {t('common.notifications')}
          </div>
          <Divider className="m-0" />
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 p-4">
              <div>
                <Avatar
                  shape="square"
                  size={40}
                  className="rounded-lg bg-[#F8F8FA] text-secondary dark:bg-white/5"
                  //   icon={<UserFilledIcon />}
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full items-center justify-between">
                  <Text className="text-xs text-secondary">3 часа назад</Text>
                  <Badge color="green" />
                </div>
                <div className="text-sm text-secondary">
                  <Text className="text-sm font-medium">Alisher Makhmudov</Text>{' '}
                  забронировал 4 ночи через Booking.com
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 font-medium text-primary"
                >
                  {/* {t('common.view')} <ArrowUpRightIcon /> */}
                </button>
              </div>
            </div>
          </div>
          <Divider className="m-0" />
          <div className="p-4 text-center font-medium text-primary-dark dark:text-secondary-light">
            {t('common.view-all-notifications')}
          </div>
        </div>
      }
    >
      <Button
        icon={<NotificationIcon className="text-2xl text-primary-dark" />}
        type="text"
        className="flex items-center justify-center bg-secondary-light text-primary-dark focus:shadow-md dark:bg-white/5 dark:text-white"
      />
    </Popover>
  )
}

export default NotificationPopover
