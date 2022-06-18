import { Platform, PermissionsAndroid } from 'react-native'
import RNGeolocation from '@react-native-community/geolocation'
import { Coordinates } from '../../mst'

export function getOneTimeLocation(
  callback: (coordinates: Coordinates) => Promise<void>,
) {
  let formattedCoords: string[]
  formattedCoords = []
  RNGeolocation.getCurrentPosition(
    async position => {
      const { coords } = position
      if (coords) {
        const { latitude, longitude } = coords
        formattedCoords = [`${latitude}, ${longitude}`]
        return formattedCoords
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
  callback(formattedCoords)
}

export async function requestLocationPermission(
  callback: (coordinates: Coordinates) => Promise<void>,
) {
  if (Platform.OS === 'ios') {
    getOneTimeLocation(callback)
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
        getOneTimeLocation(callback)
      } else {
        console.log('Permission Denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }
}
