import { ConfigProvider } from 'antd'
import { useCookies } from 'react-cookie'

import RouteProvider from './providers/router-provider'
import LanguageProvider from './providers/language-provider'
import { darkTheme, lightTheme } from './providers/theme-provider'
import QueryProvider from './providers/query-provider'
import AuthProvider from './providers/auth-provider'
import { useEffect, useState } from 'react'
import uz from 'antd/lib/locale/uz_UZ'
import ru from 'antd/lib/locale/ru_RU'
import { useTranslation } from 'react-i18next'

export default function App() {
  const [cookies] = useCookies(['darkTheme'])
  const [locale, setLocale] = useState<any>(uz)

  const { i18n } = useTranslation()

  useEffect(() => {
    setLocale(i18n.language === 'uz' || i18n.language === 'oz' ? uz : ru)
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
