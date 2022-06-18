import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigatorParamList } from '../navigation/AppNavigator'
import { Avatar, Card, Icon } from '@rneui/base'
import { CardFeaturedSubtitle } from '@rneui/base/dist/Card/Card.FeaturedSubtitle'
import { CustomHeader } from '../components/CustomHeader'
import { useStores } from '../mst'
import { observer } from 'mobx-react-lite'

type DetailsScreenProps = NativeStackScreenProps<NavigatorParamList, 'Details'>

export const DetailsScreen = observer(function DetailsScreen({
  navigation,
  route,
}: DetailsScreenProps) {
  const [starSelected, setStarSelected] = React.useState(false)
  const { clinician } = route.params
  const { fullName, bio, email, imageUrl, phone, location, id } = clinician
  const {
    cliniciansStore: { favorite, setFavorite },
  } = useStores()

  function toggleFavorite() {
    setFavorite(clinician)
    setStarSelected(!starSelected)
  }
  function getIconName() {
    const isFavorite = favorite && favorite.id === id
    return isFavorite ? 'star' : 'star-outline'
  }
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <CustomHeader
        title={clinician.fullName}
        onLeftPress={() => navigation.pop()}
      />
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Avatar source={{ uri: imageUrl }} rounded size="large" />
          <Icon
            type="ionicons"
            name={getIconName()}
            color="black"
            onPress={toggleFavorite}
          />
        </View>
        <Card.Title>{fullName}</Card.Title>
        <View style={styles.contact}>
          <Text>{email}</Text>
          <Text>{phone}</Text>
          <Text>{location}</Text>
        </View>
        <Card.Divider />
        <CardFeaturedSubtitle style={{ color: 'black' }}>
          {bio}
        </CardFeaturedSubtitle>
      </Card>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: { flexGrow: 1 },
  contact: {
    paddingBottom: 20,
    justifyContent: 'space-between',
    height: 84,
  },
  card: { borderRadius: 8 },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
