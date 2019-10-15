import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import cn from './zh-cn'
import en from './en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      cn,
      en
    },
    lng: 'cn',
    fallbackLng: 'cn'
    // interpolation: {
    //   escapeValue: false
    // }
  })

export default i18n