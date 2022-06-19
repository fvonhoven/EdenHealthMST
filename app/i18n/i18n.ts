import I18n from 'react-native-i18n'
import en from './locales/en'

I18n.fallbacks = true

I18n.translations = {
  en,
}
// TODO: create typing from en.ts k:vs
const t = (translate: string) => I18n.t(translate)

export { t }
