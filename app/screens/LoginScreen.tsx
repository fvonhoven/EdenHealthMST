import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { FormBuilder } from 'react-native-paper-form-builder'
import { Button } from 'react-native-paper'
import { useForm } from 'react-hook-form'
// import { TouchableOpacity } from '@rneui/base/dist/TouchableOpacity'
// import { t } from '../i18n/i18n'

export function LoginScreen() {
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  })
  // function handleLogin() {
  //   dispatch(setLoggedIn(true))
  // }
  // TODO: add validations
  // TODO:
  return (
    <View style={styles.root}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../assets/eden-health-logo.png')}
      />
      <FormBuilder
        control={control}
        setFocus={setFocus}
        // theme={}
        formConfigArray={[
          {
            type: 'email',
            name: 'email',
            rules: {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value:
                  /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                message: 'Email is invalid',
              },
            },
            textInputProps: {
              label: 'email', // t('email'),
            },
          },
          {
            type: 'password',
            name: 'password',
            rules: {
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
            },
            textInputProps: {
              label: 'password', // t('password'),
            },
          },
        ]}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={handleSubmit(data => console.log(data))}>
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 20, marginTop: '30%' },
  logo: { height: 80, aspectRatio: 4, alignSelf: 'center' },
})
