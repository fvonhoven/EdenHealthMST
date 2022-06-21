import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { t } from '../i18n'

export const EmptyData = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{t('greeting')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    marginTop: '35%',
  },
  text: {
    fontSize: 20,
  },
})
