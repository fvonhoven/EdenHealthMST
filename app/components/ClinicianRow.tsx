import React from 'react'
import { StyleProp, View, StyleSheet } from 'react-native'
import { Clinician } from '../mst/'
import { ListItem, Avatar } from '@rneui/themed'
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content'
import { Icon } from '@rneui/base/dist/Icon'
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title'
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle'
import { color } from '../theme'

type ClinicianRowProps = {
  clinician: Clinician
  onPress: (clinician: Clinician) => void
  styleOverride?: StyleProp<{}>
  favorite?: boolean
}

export function ClinicianRow({ clinician, onPress, styleOverride, favorite }: ClinicianRowProps) {
  const {
    fullName,
    imageUrl,
    email,
    id,
    address: { city, state },
  } = clinician

  function handleRowPress() {
    onPress(clinician)
  }
  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={handleRowPress}
      containerStyle={[styles.container, styleOverride]}
    >
      <Avatar
        source={{ uri: imageUrl }}
        rounded
        size="medium"
        renderPlaceholderContent={<Icon name="person" />}
      />
      <ListItemContent>
        <ListItemTitle>{fullName}</ListItemTitle>
        <ListItemSubtitle numberOfLines={1}>{email}</ListItemSubtitle>
        <View style={styles.addressContainer}>
          <ListItemSubtitle numberOfLines={1}>{city}, </ListItemSubtitle>
          <ListItemSubtitle numberOfLines={1}>{state}</ListItemSubtitle>
        </View>
      </ListItemContent>
      {!favorite && <ListItem.Chevron />}
    </ListItem>
  )
}

const styles = StyleSheet.create({
  addressContainer: { flexDirection: 'row' },
  container: { backgroundColor: color.rowBackground },
})
