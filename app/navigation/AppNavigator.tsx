import * as React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, HomeScreen } from '../screens'

export type NavigatorParamList = {
  'Eden Health': undefined
  Details: undefined
  Login: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
    // screenOptions={({ route, navigation }) => ({
    //   header: () => (
    //     <Header
    //       title={route.params?.clinician.fullName || route.name}
    //       onBackPress={() => navigation.pop()}
    //     />
    //   ),
    // })}
    >
      <Stack.Screen name="Eden Health" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* {true ? (
        <>
        </>
      ) : (
        <>
          {<Stack.Screen
            name="Eden Health"
            options={{ headerTitle: 'Eden Health' }}
            component={HomeScreen}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          </>
          
      )}
      */}
    </Stack.Navigator>
  )
}

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  // useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}>
      <AppStack />
    </NavigationContainer>
  )
}
