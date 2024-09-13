import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { tipo_de_import } from './types';

async function importFile(tipo: tipo_de_import) {
  try {
    if (tipo === 'database') {
      // Abre o seletor de documentos
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/db', // Especifique a extensão do arquivo que deseja importar
      });

      if (!result.canceled && result.assets) {
        const { uri, name, file } = result.assets[0];
        const newPath =
          FileSystem.documentDirectory + '/SQLite/' + name + file?.type;

        // Copia o arquivo para o sistema de arquivos do Expo
        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });

        console.log('Arquivo importado para:', newPath);
      } else {
        throw new Error('Erro ao importar o arquivo tente novamente');
      }
    }
  } catch (error) {
    throw error;
  }
}

export default importFile;
