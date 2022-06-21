export const emailRules = {
  required: {
    value: true,
    message: 'Email is required',
  },
  pattern: {
    value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
    message: 'Email is invalid',
  },
}

export const passwordRules = {
  required: {
    value: true,
    message: 'Password is required',
  },
  minLength: {
    value: 8,
    message: 'Password should be at least 8 characters',
  },
  maxLength: {
    value: 30,
    message: 'Password should be between 8 and 30 characters',
  },
}
