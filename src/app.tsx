import { ConfigProvider } from 'antd'
import { useCookies } from 'react-cookie'

import RouteProvider from './providers/router-provider'
import LanguageProvider from './providers/language-provider'
import { darkTheme, lightTheme } from './providers/theme-provider'

export default function App() {
  const [cookies] = useCookies(['darkTheme'])

  return (
    <LanguageProvider>
      <ConfigProvider theme={cookies.darkTheme ? darkTheme : lightTheme}>
        <RouteProvider />
      </ConfigProvider>
    </LanguageProvider>
  )
}
