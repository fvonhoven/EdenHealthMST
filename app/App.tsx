import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, useColorScheme, Platform, StyleSheet } from 'react-native'
import { AppNavigator } from './navigation'
import { RootStoreProvider, setupRootStore } from './mst'
import { Provider as PaperProvider } from 'react-native-paper'
import { color, theme } from './theme'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [rootStore, setRootStore] = useState<any>()

  async function setup() {
    await setupRootStore().then(setRootStore)
  }

  useEffect(() => {
    setup()
  }, [])

  if (!rootStore) {
    return null
  }
  return (
    <PaperProvider theme={theme}>
      <RootStoreProvider value={rootStore}>
        <SafeAreaView style={styles.safe}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={color.highlight}
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
  },
})
