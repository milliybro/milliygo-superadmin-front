import { ConfigProvider } from 'antd'
import { useCookies } from 'react-cookie'

import RouteProvider from './providers/router-provider'
import LanguageProvider from './providers/language-provider'
import { darkTheme, lightTheme } from './providers/theme-provider'
import QueryProvider from './providers/query-provider'
import AuthProvider from './providers/auth-provider'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getAntdLocale } from './helpers/get-ant-locale'

export default function App() {
  const [cookies] = useCookies(['darkTheme'])
  const [locale, setLocale] = useState<any>(getAntdLocale('uz'))

  const { i18n } = useTranslation()

  useEffect(() => {
    setLocale(getAntdLocale(i18n.language as 'uz' | 'ru' | 'oz'))
  }, [i18n.language])

  return (
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
  )
}
