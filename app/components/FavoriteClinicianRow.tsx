import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Clinician } from '../mst'
import { color, spacing } from '../theme'
import { ClinicianRow } from './ClinicianRow'
import { Icon } from '@rneui/base/dist/Icon'

type FavoriteClinicianProps = {
  clinician?: Clinician
  onPress: (clinician: Clinician) => void
  onIconPress: (clinician: Clinician) => void
}

export function FavoriteClinicianRow({
  clinician,
  onPress,
  onIconPress,
}: FavoriteClinicianProps) {
  if (!clinician) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Icon
        name="favorite"
        color={color.dark}
        containerStyle={styles.icon}
        onPress={() => onIconPress(clinician)}
      />
      <ClinicianRow
        styleOverride={styles.container}
        clinician={clinician}
        onPress={onPress}
        favorite
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: color.favorite },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.dark,
  },
  icon: {
    position: 'absolute',
    right: spacing(2),
    top: spacing(2),
    zIndex: 1,
  },
})
