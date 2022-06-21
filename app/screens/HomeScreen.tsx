import React from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
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
import { t } from '../i18n'

type HomeScreenProps = NativeStackScreenProps<NavigatorParamList, 'Eden Health'>

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
    setFavorite,
  } = cliniciansStore
  const noClinicians =
    filteredClinicians.length === 0 || sortedClinicians.length === 0

  async function getUserLocationState(
    formattedCoords: Coordinates,
  ): Promise<void> {
    const state = await fetchUserLocationState(formattedCoords)
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

  function handleFavoriteIconPress(unfavoritedClinician: Clinician) {
    Alert.alert(
      `${'Unfavorite'} ${unfavoritedClinician.fullName}?`,
      t('unfavoriteMessage'),
      [
        {
          text: t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('confirm'),
          onPress: () => setFavorite(unfavoritedClinician),
        },
      ],
    )
  }

  function renderListHeader() {
    return (
      <FavoriteClinicianRow
        clinician={favorite}
        onPress={goToDetails}
        onIconPress={handleFavoriteIconPress}
      />
    )
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
  function keyExtractor(item: any) {
    return item.id
  }

  if (noClinicians) {
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
