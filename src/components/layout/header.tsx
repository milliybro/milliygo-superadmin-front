import { useEffect } from 'react'
import { Divider } from 'antd'

import { useTranslation } from 'react-i18next'

import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'

import CSelect from '../ui/select'
import Breadcrumbs from '../ui/breadcrumbs'
import ProfilePopover from '../shared/profile-popover'
import NotificationPopover from '../shared/notification-popover'
import dayjs from 'dayjs'
import 'dayjs/locale/uz'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/ru'
import queryClient from '@/utils/query-client'

const Header = () => {
  const { i18n } = useTranslation()
  const { breadCrumbs } = useBreadCrumbsStore(store => store)

  const changeLanguage = (val: string) => {
    i18n.changeLanguage(val)
    queryClient.invalidateQueries()
  }

  useEffect(() => {
    const lang =
      i18n.language === 'uz'
        ? 'uz'
        : i18n.language === 'oz'
          ? 'uz-latn'
          : i18n.language

    dayjs.locale(lang)
  }, [i18n.language])

  return (
    <header
      id="main-header"
      className="sticky z-10 top-0 bg-white border-b dark:bg-dark-bg border-border py-1 px-6 flex justify-between items-center"
    >
      <Breadcrumbs items={breadCrumbs} className="w-auto m-0" />
      <div className="flex items-center space-x-4">
        <CSelect
          className="[&_.ant-select-selector]:shadow-none"
          rootClassName="shadow-none"
          size="large"
          variant="borderless"
          defaultValue={i18n.language}
          onChange={changeLanguage}
          options={[
            {
              label: "O'zbekcha",
              value: 'oz',
            },
            { label: 'Ўзбекча', value: 'uz' },
            { label: 'Русский', value: 'ru' },
          ]}
        />
        <Divider type="vertical" className="mx-[20px] h-[24px]" />
        <NotificationPopover />
        <Divider type="vertical" className="mx-[20px] h-[24px]" />
        <ProfilePopover />
      </div>
    </header>
  )
}

export default Header
