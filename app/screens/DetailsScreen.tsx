import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigatorParamList } from '../navigation/AppNavigator'
import { Avatar, Card, IconButton, Paragraph } from 'react-native-paper'

type DetailsScreenProps = NativeStackScreenProps<NavigatorParamList, 'Details'>

export function DetailsScreen({ route }: DetailsScreenProps) {
  // const { favorite } = useAppSelector(state => state.clinician)
  const [starSelected, setStarSelected] = React.useState(false)
  // const dispatch = useAppDispatch()
  const { clinician } = route.params
  const { fullName, bio, email, imageUrl, phone, location, id } = clinician

  function toggleFavorite() {
    // dispatch(setFavorite(clinician))
    setStarSelected(!starSelected)
  }
  function getIconName() {
    // const isFavorite = favorite && favorite.id === id
    return true ? 'star' : 'star-outline'
  }
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Card style={styles.card} mode="elevated" elevation={4}>
        <Card.Title
          title={fullName}
          left={() => <Avatar.Image source={{ uri: imageUrl }} size={48} />}
          right={() => (
            <IconButton
              icon={getIconName()}
              color="black"
              onPress={toggleFavorite}
            />
          )}
        />
        {/* <View style={styles.contact}>
          <Text>{email}</Text>
          <Text>{phone}</Text>
          <Text>{location}</Text>
        </View> */}
        <Card.Content style={{ color: 'black' }}>
          <Paragraph>{bio}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: { flexGrow: 1 },
  contact: {
    paddingBottom: 20,
    justifyContent: 'space-between',
    height: 84,
  },
  card: { borderRadius: 8, margin: 14 },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
