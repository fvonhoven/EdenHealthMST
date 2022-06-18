import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { AppNavigator } from './navigation'
import { RootStoreProvider, setupRootStore } from './mst'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './theme'

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
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />
        </SafeAreaView>
      </RootStoreProvider>
    </PaperProvider>
  )
}

export default App
