import React from 'react'
import { View, Text, StyleSheet } from "react-native"
import {  Icon, Button } from '@rneui/base'
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
          />
      ) : (
        <View style={styles.left} />
      )}
      <View style={styles.titleMiddle}>
        <Text style={[styles.title]} >{title}</Text>
      </View>
      {onRightPress ? (
        <Button containerStyle={{backgroundColor: 'red'}} onPress={onRightPress}>
          <Icon
            name={`${rightIconName}`}
            type="ionicon"
            size={spacing(4)}
            onPress={onRightPress}
          />
        </Button>
      ) : (
        <View style={styles.right} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingHorizontal: spacing(1),
    alignItems: "center",
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    justifyContent: "flex-start",
    backgroundColor: color.highlight
  },
  title: { textAlign: "center", fontSize: fonts.size.medium, fontWeight: 'bold' },
  titleMiddle: { flex: 1, justifyContent: "center" },
  left: { width: spacing(4) },
  right: { width: spacing(4) },
})
