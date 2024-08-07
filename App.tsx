import { ThemeProviderApp } from './providers/theme';
import Application from './components/Application';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SQLiteProvider } from 'expo-sqlite';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function Start() {
      if (
        (
          await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + 'SQLite/stock.db',
          )
        ).exists
      ) {
        await FileSystem.downloadAsync(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          Asset.fromModule(require('$assets/databases/stock.db')).uri,
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
