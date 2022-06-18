import * as React from 'react'
import { useColorScheme } from 'react-native'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, HomeScreen, DetailsScreen } from '../screens'
import { useStores } from '../mst'

export type NavigatorParamList = {
  'Eden Health': undefined
  Details: { clinician: any }
  Login: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  const {
    cliniciansStore: { isLoggedIn },
  } = useStores()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Eden Health"
            options={{ headerTitle: 'Eden Health' }}
            component={HomeScreen}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </>
      )}
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
