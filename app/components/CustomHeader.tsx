import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from '@rneui/base'
import { spacing, fonts, color } from '../theme'

interface HeaderProps {
  title?: string
  rightIconName?: string
  leftIconName?: string
  onLeftPress?(): void
  onRightPress?(): void
}

export function CustomHeader(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIconName,
    leftIconName,
    title,
  } = props

  return (
    <View style={[styles.root]}>
      {onLeftPress ? (
        <Icon
          name={`${leftIconName}`}
          type="ionicon"
          size={spacing(4)}
          onPress={onLeftPress}
          iconStyle={styles.leftIcon}
        />
      ) : (
        <View style={styles.left} />
      )}
      <View style={styles.titleMiddle}>
        <Text style={[styles.title]}>{title}</Text>
      </View>
      {onRightPress ? (
        <Icon
          name={`${rightIconName}`}
          type="ionicon"
          size={spacing(4)}
          onPress={onRightPress}
          iconStyle={styles.rightIcon}
        />
      ) : (
        <View style={styles.right} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3),
    backgroundColor: color.highlight,
  },
  title: {
    textAlign: 'center',
    fontSize: fonts.size.medium,
    fontWeight: 'bold',
    color: color.dark,
  },
  titleMiddle: { flex: 1, justifyContent: 'center' },
  left: { width: spacing(4) },
  right: { width: spacing(4) },
  leftIcon: {
    color: color.dark,
  },
  rightIcon: {
    color: color.dark,
  },
})
