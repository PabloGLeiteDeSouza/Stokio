import existem_registros from '$functions/existem_registros';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { openDatabaseAsync } from 'expo-sqlite';

async function exportDatabase() {
  try {
    const db = await openDatabaseAsync('stock.db');
    if (!(await existem_registros(db))) {
      throw new Error('Não existem dados cadastrados!');
    }
    const fileUri = FileSystem.documentDirectory + '/SQLite/stock.db';
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      throw new Error('Compartilhamento não disponível');
    }
  } catch (error) {
    throw error;
  }
}

export default exportDatabase;
