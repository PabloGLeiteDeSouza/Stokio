import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export default async function import_database() {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });

        if (!result.assets) {
            throw new Error("Erro ao importar o banco de dados!");
        }

        if (!result.assets[0].name.includes('.db')) {
            throw new Error("Erro ao importar o banco de dados, o arquivo não é um banco de dados!");
        }

        const sqliteDirectory = FileSystem.documentDirectory + 'SQLite';

        if (!(await FileSystem.getInfoAsync(sqliteDirectory)).exists) {
            await FileSystem.makeDirectoryAsync(sqliteDirectory);
        }

        await FileSystem.copyAsync({
            from: result.assets[0].uri,
            to: `${sqliteDirectory}/stock.db`,
        });

        Alert.alert('Sucesso', 'Banco importado com sucesso!');
    } catch (error) {
        Alert.alert('Erro', (error as Error).message);
    }
}
