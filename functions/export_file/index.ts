import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { extensions_file } from './types';

async function exportFile(ext: extensions_file, data: string) {
  try {
    const fileUri = FileSystem.documentDirectory + data + ext;
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      throw new Error('Compartilhamento não disponível');
    }
  } catch (error) {
    throw error;
  }
}

export default exportFile;
