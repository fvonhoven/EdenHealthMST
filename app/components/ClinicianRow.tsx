import React from 'react'
import { StyleProp } from 'react-native'
// import { Clinician } from '../modelTypes/Clinician.types'
import { Avatar, Card, IconButton } from 'react-native-paper'

type ClinicianRowProps = {
  clinician: Clinician
  onPress: (clinician: Clinician) => void
  styleOverride?: StyleProp<{}>
  favorite?: boolean
}

export function ClinicianRow({
  clinician,
  onPress,
  favorite,
}: ClinicianRowProps) {
  const {
    fullName,
    imageUrl,
    id,
    address: { city, state },
  } = clinician

  function handleRowPress() {
    onPress(clinician)
  }
  function renderRight() {
    return !favorite ? (
      <IconButton icon="chevron-right" onPress={handleRowPress} />
    ) : null
  }
  function renderLeft() {
    return <Avatar.Image source={{ uri: imageUrl }} size={48} />
  }
  return (
    <Card key={id} elevation={5} testID="clinician-row">
      <Card.Title
        title={fullName}
        subtitle={`${city}, ${state}}`}
        subtitleNumberOfLines={2}
        left={renderLeft}
        right={renderRight}
      />
    </Card>
  )
}
