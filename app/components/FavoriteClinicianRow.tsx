import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Clinician } from '../mst'
import { fonts, spacing } from '../theme'
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
      <ClinicianRow styleOverride={styles.row} clinician={clinician} onPress={onPress} favorite />
    </View>
  )
}

const styles = StyleSheet.create({
  row: { backgroundColor: 'paleturquoise' },
  text: {
    paddingTop: spacing(2),
    paddingLeft: spacing(2),
    fontWeight: 'bold',
    fontSize: fonts.size.regular,
  },
})
