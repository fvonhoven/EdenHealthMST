import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigatorParamList } from '../navigation/AppNavigator'
import { FavoriteClinician } from '../components/FavoriteClinician'
import { ClinicianRow } from '../components/ClinicianRow'
import { EmptyData } from '../components/EmptyData'
import DATA from '../mockData/CliniciansListMock.json'

type HomeScreenProps = NativeStackScreenProps<NavigatorParamList, 'Eden Health'>
// type Props = {
//   clinician: Clinician
//   onPress: () => void
// }

export function HomeScreen({ navigation }: HomeScreenProps) {
  const listRef = useRef<FlatList>(null)
  // const { favorite } = useAppSelector(state => state.clinician)
  // const dispatch = useAppDispatch()
  // const clinicians = useAppSelector(state => {
  //   const allClinicians = state.clinician.clinicians

  //   const filterState = state.clinician.filterState
  //   if (filterState === null) {
  //     return allClinicians
  //     // .sort(
  //     //   (a: Clinician, b: Clinician) => (a.firstName > b.firstName ? 1 : -1),
  //     // )
  //   } else {
  //     return allClinicians.filter(
  //       (clinician: Clinician) => clinician.state === filterState,
  //     )
  //   }
  // })

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     favorite.id &&
  //       listRef.current?.scrollToIndex({ index: 0, animated: false })
  //   })
  //   return unsubscribe
  // }, [navigation, favorite])

  // function goToDetails(clinician: Clinician) {
  //   navigation.navigate('Details', { clinician })
  // }
  function renderItem({ item: clinician }: { item: any }) {
    return (
      <ClinicianRow
        key={clinician.id}
        clinician={clinician}
        onPress={() => navigation.navigate('Details', { clinician })}
      />
    )
  }

  // function renderListHeader() {
  //   return <FavoriteClinician clinician={favorite} onPress={goToDetails} />
  // }

  function keyExtractor(item: any) {
    return item.id
  }
  // if (true) return <EmptyData />
  return (
    <View style={styles.root}>
      <FlatList
        ref={listRef}
        data={DATA || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        // ListHeaderComponent={renderListHeader}
        stickyHeaderIndices={[0]}
        initialNumToRender={500}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    fontSize: 32,
    backgroundColor: 'red',
  },
})
