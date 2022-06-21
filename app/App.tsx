import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet } from 'react-native'
import { AppNavigator } from './navigation'
import { RootStoreProvider, setupRootStore } from './mst'
import { Provider as PaperProvider } from 'react-native-paper'
import * as SplashScreen from 'expo-splash-screen'
import { color, theme } from './theme'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [rootStore, setRootStore] = useState<any>()
  const [appIsReady, setAppIsReady] = useState(false)

  async function setup() {
    await setupRootStore().then(setRootStore)
  }

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    setup()
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady || !rootStore) {
    return null
  }

  return (
    <PaperProvider theme={theme}>
      <RootStoreProvider value={rootStore}>
        <SafeAreaView style={styles.safe} onLayout={onLayoutRootView}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={color.background}
          />
          <AppNavigator />
        </SafeAreaView>
      </RootStoreProvider>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.background,
  },
})
