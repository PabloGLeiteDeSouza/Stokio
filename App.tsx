import { ThemeProviderApp } from '@/providers/theme';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SQLiteProvider } from 'expo-sqlite';
import Application from '@app';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function Start() {
      if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/stock.db')).exists) {
        const asset = await Asset.fromModule(require('./assets/example.db')).downloadAsync();
        await FileSystem.copyAsync({
          from: String(asset.localUri),
          to: FileSystem.documentDirectory + 'SQLite/stock.db',
        });
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