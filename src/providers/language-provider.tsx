import { I18nextProvider } from 'react-i18next'

import i18n from '../locales'

import type { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const LanguageProvider: FC<IProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default LanguageProvider
