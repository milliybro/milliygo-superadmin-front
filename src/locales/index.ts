import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ru from './ru.json'
import uz from './uz.json'
import oz from './oz.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      uz: { translation: uz },
      oz: { translation: oz },
      ru: { translation: ru },
    },
    lng: localStorage.getItem('i18nextLng') ?? 'ru',
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false,
    },
  })
  .catch(err => {
    console.error(err)
  })

export default i18n
