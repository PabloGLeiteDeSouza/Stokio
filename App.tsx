import { ThemeProviderApp } from '@/providers/theme';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SQLiteProvider } from 'expo-sqlite';
import Application from '@app';
import start_new_database from '@/utils/start_database';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function Start() {
      if (
        !(
          await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + 'SQLite/stock.db',
          )
        ).exists
      ) {
        await FileSystem.downloadAsync(
          'https://github.com/PabloGLeiteDeSouza/Stokio/raw/refs/heads/master/src/database/example.db',
          `${FileSystem.documentDirectory}SQLite/stock.db`,
        );
      }
      setIsLoading(false);
    }
    Start();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProviderApp>
      <SQLiteProvider databaseName="stock.db">
        <Application />
      </SQLiteProvider>
    </ThemeProviderApp>
  );
}
