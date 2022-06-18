import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigatorParamList } from '../navigation/AppNavigator'
import { FavoriteClinicianRow } from '../components/FavoriteClinicianRow'
import { ClinicianRow, CustomHeader } from '../components'
import { EmptyData } from '../components/EmptyData'
import RNGeolocation from '@react-native-community/geolocation'
import { observer } from 'mobx-react-lite'
import { useStores } from '../mst/mstContext'
import { Clinician } from '../mst'

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
  } = cliniciansStore

  function getOneTimeLocation() {
    RNGeolocation.getCurrentPosition(
      async position => {
        const { coords } = position
        if (coords) {
          const { latitude, longitude } = coords
          const formattedCoords = [`${latitude}, ${longitude}`]
          const state = await fetchUserLocationState(formattedCoords)
          state && setIsFiltering(true)
        }
      },
      error => {
        console.error(error.message)
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    )
  }

  async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
      getOneTimeLocation()
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message:
              'Eden health needs to access your location to filter Clinicians in your state.', // TODO: i18n these
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation()
        } else {
          console.log('Permission Denied')
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  function handleUserLocation() {
    console.log('USER LOCATION STATE', userLocationState)
    if (userLocationState) {
      setIsFiltering(!filtering)
    } else {
      requestLocationPermission()
    }
  }

  function goToDetails(clinician: Clinician) {
    navigation.navigate('Details', { clinician })
  }
  function renderItem({ item: clinician }: { item: Clinician }) {
    return (
      <ClinicianRow
        key={clinician.id}
        clinician={clinician}
        onPress={() => navigation.navigate('Details', { clinician })}
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
        // rightIconName={isFiltering ? 'filter' : 'filter-outline'}
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
    fontSize: 32,
    backgroundColor: 'red',
  },
})
