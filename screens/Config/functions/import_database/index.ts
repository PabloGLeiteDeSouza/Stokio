import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

async function importDatabase() {
  try {
    // Abre o seletor de documentos
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/db', // Especifique a extensão do arquivo que deseja importar
    });

    if (!result.canceled && result.assets) {
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

      console.log('Arquivo importado para:', pathDatabase);
    } else {
      throw new Error('Erro ao importar o arquivo tente novamente');
    }
  } catch (error) {
    throw error;
  }
}

export default importDatabase;
