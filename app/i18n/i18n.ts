import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import { zh, en, es } from './locales'

i18n.fallbacks = true
i18n.translations = { en, zh, es }
i18n.locale = Localization.locale

export const { t } = i18n