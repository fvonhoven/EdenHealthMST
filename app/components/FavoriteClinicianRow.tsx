import React from 'react'
import { StyleSheet } from 'react-native'
import { ClinicianRow } from './ClinicianRow'

type FavoriteClinicianProps = {
  clinician: Clinician | {}
  onPress: (clinician: Clinician) => void
}

export function FavoriteClinicianRow({
  clinician,
  onPress,
}: FavoriteClinicianProps) {
  const emptyClinician = Object.keys(clinician).length === 0
  if (emptyClinician) return null
  return (
    <ClinicianRow
      styleOverride={styles.row}
      clinician={clinician}
      onPress={onPress}
      favorite
    />
  )
}

const styles = StyleSheet.create({
  row: { backgroundColor: 'yellow' },
})
