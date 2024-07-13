import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { SQLiteDatabase, openDatabaseAsync } from 'expo-sqlite/next';

export default async function openDatabaseAsyncWithAsset(
  AssetsFiles: Asset[] | undefined,
  filename: string,
): Promise<SQLiteDatabase> {
  if (!AssetsFiles || AssetsFiles.length === 0) {
    throw new Error('AssetsFiles array is empty or undefined');
  }

  const dbUri: string = `${FileSystem.documentDirectory}SQLite/${filename}`;
  const dbDirectory: string = `${FileSystem.documentDirectory}SQLite`;

  try {
    if (!(await FileSystem.getInfoAsync(dbDirectory)).exists) {
      await FileSystem.makeDirectoryAsync(dbDirectory);
    }

    if (!(await FileSystem.getInfoAsync(dbUri)).exists) {
      const dbAsset: Asset = AssetsFiles[0];
      await FileSystem.copyAsync({
        from: String(dbAsset.localUri),
        to: dbUri,
      });
    }

    // return the 'db' value in the finally block
    const db = await openDatabaseAsync(filename);

    return db;
  } catch (err: any) {
    throw new Error('Could not execute this action', { cause: err });
  }
}
