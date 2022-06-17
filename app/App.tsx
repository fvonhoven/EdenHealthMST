import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { AppNavigator } from './navigation'
import { RootStoreProvider, setupRootStore } from './mst'

interface State {
  rootStore: Root
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [rootStore, setRootStore] = useState<any>()

  useEffect(() => {
    ;(async () => {
      await setupRootStore().then(setRootStore)
    })()
  }, [])

  if (!rootStore) {
    return null
  }
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </SafeAreaView>
    </RootStoreProvider>
  )
}

export default App
