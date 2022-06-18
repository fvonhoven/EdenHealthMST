import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Clinician } from '../mst'
import { ClinicianRow } from './ClinicianRow'

type FavoriteClinicianProps = {
  clinician?: Clinician
  onPress: (clinician: Clinician) => void
}

export function FavoriteClinicianRow({
  clinician,
  onPress,
}: FavoriteClinicianProps) {
  if (!clinician) {
    return null
  }
  return (
    <View style={styles.row}>
      <Text style={styles.text}>Favorite Clinician</Text>
      <ClinicianRow
        styleOverride={styles.row}
        clinician={clinician}
        onPress={onPress}
        favorite
      />
    </View>
  )
} // TODO: add a star to row ???s

const styles = StyleSheet.create({
  row: { backgroundColor: 'paleturquoise' },
  text: { paddingTop: 10, paddingLeft: 10, fontWeight: 'bold', fontSize: 15 },
})
