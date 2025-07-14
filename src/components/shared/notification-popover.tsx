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
      overlayInnerStyle={{ padding: 0, overflow: 'hidden', width: 390 }}
      className="shrink-0"
      content={
        <div className="flex flex-col">
          <div className="text-sm font-medium p-5 leading-[20px] ">
            {t('common.notifications')}
          </div>
          <Divider className="m-0" />
          <div className="flex flex-col">
            <div className="flex flex-row p-4 gap-2">
              <div>
                <Avatar
                  shape="square"
                  size={40}
                  className="bg-[#F8F8FA] dark:bg-white/5 text-secondary rounded-lg"
                  //   icon={<UserFilledIcon />}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <div className="flex items-center w-full justify-between">
                  <Text className="text-xs text-secondary">3 часа назад</Text>
                  <Badge color="green" />
                </div>
                <div className="text-secondary text-sm">
                  <Text className="font-medium text-sm">Alisher Makhmudov</Text>{' '}
                  забронировал 4 ночи через Booking.com
                </div>
                <button
                  type="button"
                  className="flex items-center font-medium gap-1 text-primary"
                >
                  {/* {t('common.view')} <ArrowUpRightIcon /> */}
                </button>
              </div>
            </div>
          </div>
          <Divider className="m-0" />
          <div className="p-4 text-center text-primary-dark dark:text-secondary-light font-medium">
            {t('common.view-all-notifications')}
          </div>
        </div>
      }
    >
      <Button
        icon={<NotificationIcon className="text-2xl text-primary-dark" />}
        type="text"
        className="bg-secondary-light text-primary-dark dark:text-white dark:bg-white/5 focus:shadow-md flex items-center justify-center"
      />
    </Popover>
  )
}

export default NotificationPopover
