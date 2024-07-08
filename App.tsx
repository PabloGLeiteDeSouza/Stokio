import { ThemeProviderApp } from './providers/theme'
import Application from './components/Application'
import React from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

SplashScreen.preventAutoHideAsync();

export default function App() {

  React.useEffect(() => {
    async function Start() {
      await FileSystem.downloadAsync(
        Asset.fromModule(require('$assets/databases/stock.db')).uri,
        `${FileSystem.documentDirectory}SQLite/stock.db`
      );
    }
    Start();
  }, [])




  return (
    <ThemeProviderApp>
      <Application />
    </ThemeProviderApp>
  );
}