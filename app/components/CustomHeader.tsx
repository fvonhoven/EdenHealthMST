import React from 'react'
import { StyleSheet } from 'react-native'
import { Header as HeaderRNE, Icon } from '@rneui/base'

interface HeaderProps {
  title?: string
  rightIconName: string
  onLeftPress?(): void
  onRightPress?(): void
}

export function CustomHeader(props: HeaderProps) {
  const { onLeftPress, onRightPress, title, rightIconName } = props

  return (
    <HeaderRNE
      leftComponent={
        title === 'Eden Health'
          ? {}
          : {
              icon: 'chevron-left',
              size: 28,
              color: '#fff',
              onPress: onLeftPress,
            }
      }
      containerStyle={styles.headerContainer}
      rightComponent={
        title === 'Eden Health' ? (
          <Icon
            name={`${rightIconName}`}
            type="ionicon"
            size={28}
            color="#fff"
            onPress={onRightPress}
          />
        ) : (
          {}
        )
      }
      centerComponent={{
        text: title,
        style: styles.headerCenter,
      }}
    />
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    width: '100%',
    paddingVertical: 15,
    height: 60,
  },
  headerCenter: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
})
