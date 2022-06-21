import { t } from '../../i18n'

export const emailRules = {
  required: {
    value: true,
    message: t('emptyEmail'),
  },
  pattern: {
    value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
    message: t('invalidEmail'),
  },
}

export const passwordRules = {
  required: {
    value: true,
    message: t('emptyPassword'),
  },
  minLength: {
    value: 8,
    message: t('passwordShort'),
  },
  maxLength: {
    value: 30,
    message: t('passwordLong'),
  },
}
