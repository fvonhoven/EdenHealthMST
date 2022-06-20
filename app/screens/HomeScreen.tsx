import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigatorParamList } from '../navigation/AppNavigator'
import { FavoriteClinicianRow } from '../components/FavoriteClinicianRow'
import { ClinicianRow, CustomHeader } from '../components'
import { EmptyData } from '../components/EmptyData'
import { getLocation } from '../utils/geolocation/geolocation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../mst/mstContext'
import { Clinician, Coordinates } from '../mst'
import { fonts } from '../theme/fonts'

type HomeScreenProps = NativeStackScreenProps<NavigatorParamList, 'Eden Health'>

// GOOD: add i18n
// TODO: i18n all the things

// TODO: add api folder?
// TODO: metric magic values
// TODO: Add splash screen
// TODO: Add loading spinner
// TODO: Add app icons

// TODO: add snapshots
// TODO: add env
// TODO: add tests
// GOOD: add Android Studio and test working :-P

// FIXME: add react-native-fast-image

export const HomeScreen = observer(function HomeScreen({
  navigation,
  route,
}: HomeScreenProps) {
  const { cliniciansStore } = useStores()
  const {
    userLocationState,
    setIsFiltering,
    filtering,
    favorite,
    fetchUserLocationState,
    sortedClinicians,
    filteredClinicians,
  } = cliniciansStore

  async function getUserLocationState(
    formattedCoords: Coordinates,
  ): Promise<void> {
    const state = await fetchUserLocationState(formattedCoords)
    console.log('STATE', state)
    state && setIsFiltering(true)
  }

  async function handleUserLocation() {
    if (userLocationState) {
      setIsFiltering(!filtering)
    } else {
      await getLocation(getUserLocationState)
    }
  }

  function goToDetails(clinician: Clinician) {
    navigation.push('Details', { clinician })
  }
  function renderItem({ item: clinician }: { item: Clinician }) {
    return (
      <ClinicianRow
        key={clinician.id}
        clinician={clinician}
        onPress={goToDetails}
      />
    )
  }

  function renderListHeader() {
    return <FavoriteClinicianRow clinician={favorite} onPress={goToDetails} />
  }

  function keyExtractor(item: any) {
    return item.id
  }
  if (filteredClinicians.length === 0 || sortedClinicians.length === 0) {
    return <EmptyData />
  }
  return (
    <View style={styles.root}>
      <CustomHeader
        title={route.name}
        rightIconName={filtering ? 'funnel' : 'funnel-outline'}
        onRightPress={handleUserLocation}
      />
      <FlatList
        data={filtering ? filteredClinicians : sortedClinicians}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        stickyHeaderIndices={[0]}
        initialNumToRender={15}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    fontSize: fonts.size.large,
    backgroundColor: 'red',
  },
})
