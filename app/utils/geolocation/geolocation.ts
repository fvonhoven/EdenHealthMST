import { Platform, PermissionsAndroid, Linking, Alert, ToastAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { Coordinates } from '../../mst'
import { t } from '../../i18n'

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert(t('unableToOpenSettings'))
    })
  }
  const status = await Geolocation.requestAuthorization('whenInUse')

  if (status === 'granted') {
    return true
  }

  if (status === 'denied') {
    Alert.alert(t('locationPermissionDenied'))
  }

  if (status === 'disabled') {
    Alert.alert(t('locationDisabledErrorMsg'), '', [
      { text: t('goToSettings'), onPress: openSetting },
      { text: t('dontUseLocation'), onPress: () => {} },
    ])
  }

  return false
}

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS()
    return hasPermission
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  )

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(t('locationDeniedAndroid'), ToastAndroid.LONG)
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(t('locationRevokedAndroid'), ToastAndroid.LONG)
  }

  return false
}

export const getLocation = async (callback: (coordinates: Coordinates) => Promise<void>) => {
  const hasPermission = await hasLocationPermission()

  if (!hasPermission) {
    return
  }

  Geolocation.getCurrentPosition(
    position => {
      const { coords } = position
      if (coords) {
        const { latitude, longitude } = coords
        const formattedCoords = [`${latitude}, ${longitude}`]
        callback(formattedCoords)
      }
    },
    error => {
      Alert.alert(`Code ${error.code}`, error.message)
      console.log(error)
    },
    {
      accuracy: {
        android: 'low',
        ios: 'nearestTenMeters',
      },
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 0,
      showLocationDialog: true,
    },
  )
}
