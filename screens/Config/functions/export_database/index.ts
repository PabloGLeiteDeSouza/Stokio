import existem_registros from '$functions/existem_registros';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { openDatabaseAsync } from 'expo-sqlite';
import { Alert } from 'react-native';

async function exportDatabase() {
  try {
    const db = await openDatabaseAsync('stock.db');
    if (!(await existem_registros(db))) {
      throw new Error(
        'Não foi possivel exportar os dados pois não existem dados cadastrados!',
      );
    }
    const fileUri = FileSystem.documentDirectory + '/SQLite/stock.db';
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      throw new Error('Compartilhamento não disponível');
    }
  } catch (error) {
    Alert.alert('Erro', (error as Error).message);
    throw error;
  }
}

export default exportDatabase;
