import { ConfigProvider, App as AntdApp } from 'antd'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import RouteProvider from './providers/router-provider'
import LanguageProvider from './providers/language-provider'
import QueryProvider from './providers/query-provider'
import AuthProvider from './providers/auth-provider'
import { darkTheme, lightTheme } from './providers/theme-provider'
import { getAntdLocale } from './helpers/get-ant-locale'
import dayjs from 'dayjs'
import 'dayjs/locale/uz'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/ru'

export default function App() {
  const [cookies] = useCookies(['darkTheme'])
  const { i18n } = useTranslation()
  const [locale, setLocale] = useState<any>(getAntdLocale('uz'))

  useEffect(() => {
    const lang = i18n.language
    dayjs.locale(lang === 'oz' ? 'uz-latn' : lang === 'uz' ? 'uz' : 'ru')
    setLocale(getAntdLocale(lang as 'uz' | 'oz' | 'ru'))
  }, [i18n.language])

  return (
    <AntdApp>
      <LanguageProvider>
        <QueryProvider>
          <AuthProvider>
            <ConfigProvider
              theme={cookies.darkTheme ? darkTheme : lightTheme}
              locale={locale}
            >
              <RouteProvider />
            </ConfigProvider>
          </AuthProvider>
        </QueryProvider>
      </LanguageProvider>
    </AntdApp>
  )
}
