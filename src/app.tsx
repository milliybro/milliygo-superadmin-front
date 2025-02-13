import { ConfigProvider } from 'antd'
import { useCookies } from 'react-cookie'

import RouteProvider from './providers/router-provider'
import LanguageProvider from './providers/language-provider'
import { darkTheme, lightTheme } from './providers/theme-provider'
import QueryProvider from './providers/query-provider'
import AuthProvider from './providers/auth-provider'
import { useEffect, useState } from 'react'
import { getAntdLocaleCode } from './helpers/get-ant-locale-code'
import uz_UZ from 'antd/lib/locale/uz_UZ'
import { useTranslation } from 'react-i18next'

export default function App() {
  const [cookies] = useCookies(['darkTheme'])
  const [locale, setLocale] = useState<any>(uz_UZ)

  const {i18n} =useTranslation()

  console.log(i18n);
  

  useEffect(() => {
    async function loadLocale() {
      const antdLocaleCode = getAntdLocaleCode(i18n.language || 'ru')
      const antdLocale = await import(`antd/locale/${antdLocaleCode}`)
      setLocale(antdLocale.default)
    }

    loadLocale()
  }, [i18n.language])

  return (
    <LanguageProvider>
      <QueryProvider>
        <AuthProvider>
          <ConfigProvider  theme={cookies.darkTheme ? darkTheme : lightTheme} locale={locale}>
            <RouteProvider />
          </ConfigProvider>
        </AuthProvider>
      </QueryProvider>
    </LanguageProvider>
  )
}
