import React from 'react'
import { View, Text } from 'react-native'
import { Address } from '../mst'

export function AddressRow({ address }: { address: Address }) {
  return (
    <View>
      <Text>
        {address.number} {address.street} {address.suffix}
      </Text>
      <Text>
        {address.city}, {address.state} {address.zip}
      </Text>
    </View>
  )
}
