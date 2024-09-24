import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

async function importDatabase() {
  try {
    // Abre o seletor de documentos
    const result = await DocumentPicker.getDocumentAsync();

    if (!result.canceled && result.assets) {
      if (!result.assets[0].name.endsWith('.db')) {
        throw new Error('O arquvio nao e compativel');
      }
      const { uri } = result.assets[0];
      const pathDatabase = FileSystem.documentDirectory + '/SQLite/stock.db';
      const basePath = FileSystem.documentDirectory + '/SQLite/';
      if (!(await FileSystem.getInfoAsync(basePath)).exists) {
        await FileSystem.makeDirectoryAsync(basePath);
      }

      // Copia o arquivo para o sistema de arquivos do Expo
      await FileSystem.copyAsync({
        from: uri,
        to: pathDatabase,
      });

      Alert.alert('Sucesso', 'Arquivo importado com sucesso!');
    } else {
      throw new Error('Erro ao importar o arquivo tente novamente');
    }
  } catch (error) {
    Alert.alert('Erro', (error as Error).message);
    throw error;
  }
}

export default importDatabase;
