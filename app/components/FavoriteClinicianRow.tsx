import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Clinician } from '../mst'
import { color, fonts, spacing } from '../theme'
import { ClinicianRow } from './ClinicianRow'

type FavoriteClinicianProps = {
  clinician?: Clinician
  onPress: (clinician: Clinician) => void
}

export function FavoriteClinicianRow({ clinician, onPress }: FavoriteClinicianProps) {
  if (!clinician) {
    return null
  }
  return (
    <View style={styles.row}>
      <Text style={styles.text}>Favorite Clinician</Text>
      <View style={{ height: 1, backgroundColor: color.fog }} />
      <ClinicianRow styleOverride={styles.row} clinician={clinician} onPress={onPress} favorite />
    </View>
  )
}

const styles = StyleSheet.create({
  row: { backgroundColor: 'paleturquoise' },
  text: {
    paddingVertical: spacing(1),
    paddingLeft: spacing(2),
    fontWeight: 'bold',
    fontSize: fonts.size.small,
  },
})
