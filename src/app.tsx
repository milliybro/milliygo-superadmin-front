import { ConfigProvider } from 'antd'
import { useCookies } from 'react-cookie'

import RouteProvider from './providers/router-provider'
import LanguageProvider from './providers/language-provider'
import { darkTheme, lightTheme } from './providers/theme-provider'
import QueryProvider from './providers/query-provider'
import AuthProvider from './providers/auth-provider'

export default function App() {
  const [cookies] = useCookies(['darkTheme'])

  return (
    <LanguageProvider>
      <QueryProvider>
        <AuthProvider>
          <ConfigProvider theme={cookies.darkTheme ? darkTheme : lightTheme}>
            <RouteProvider />
          </ConfigProvider>
        </AuthProvider>
      </QueryProvider>
    </LanguageProvider>
  )
}
