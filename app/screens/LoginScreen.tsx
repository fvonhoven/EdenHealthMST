import React from 'react'
import { Platform, KeyboardAvoidingView, StyleSheet, Image } from 'react-native'
import { FormBuilder } from 'react-native-paper-form-builder'
import { Button } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { useStores } from '../mst'
import { color, spacing } from '../theme'
import { emailRules, passwordRules } from '../utils/validation'
import { t } from '../i18n/i18n'

export function LoginScreen() {
  const {
    cliniciansStore: { setIsLoggedIn },
  } = useStores()
  const { control, setFocus, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  })

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../assets/eden-health-logo.png')}
      />
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            type: 'email',
            name: 'email',
            rules: emailRules,
            textInputProps: {
              label: t('email'),
            },
          },
          {
            type: 'password',
            name: 'password',
            rules: passwordRules,
            textInputProps: {
              label: t('password'),
            },
          },
        ]}
      />
      <Button
        icon="login"
        mode="contained"
        contentStyle={styles.button}
        color={color.secondary}
        onPress={handleSubmit(() => setIsLoggedIn(true))}
      >
        {t('login')}
      </Button>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: spacing(2), marginTop: '30%' },
  logo: { height: spacing(10), aspectRatio: 4, alignSelf: 'center' },
  button: { height: spacing(5) },
})
