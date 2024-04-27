import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export default async function readsqlfile(
  AssetsFiles: Asset[] | undefined,
  filename: string
): Promise<string> {
  if (!AssetsFiles || AssetsFiles.length === 0) {
    throw new Error("AssetsFiles array is empty or undefined");
  }
  const sqlUri: string = `${FileSystem.documentDirectory}SQLite/sql_files/${filename}`;

  try {
    const sqlDirectory: string = `${FileSystem.documentDirectory}SQLite/sql_files`;
    const directoryExists: boolean = (await FileSystem.getInfoAsync(sqlDirectory)).exists;

    if (!directoryExists) {
      await FileSystem.makeDirectoryAsync(sqlDirectory);
    }

    const dbFileExists: boolean = (await FileSystem.getInfoAsync(sqlUri)).exists;

    if (!dbFileExists) {
      const sqlAsset: Asset = AssetsFiles[1];
      await FileSystem.copyAsync({
        from: String(sqlAsset.localUri),
        to: sqlUri,
      });
    }

    return await FileSystem.readAsStringAsync(sqlUri);

  } catch (err: any) {
    throw new Error("Could not execute this action", { cause: err });
  }
}
