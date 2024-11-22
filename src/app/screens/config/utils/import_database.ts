import DocumentPicker from 'expo-document-picker';
import FileSystem from 'expo-file-system'
import { Alert } from 'react-native';

export default async function import_database() {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        })
        if(!result.assets){
            throw new Error("Erro ao importar o banco de dados!");
        }
        if (!result.assets[0].name.includes('.db')) {
            throw new Error("Erro ao importar o banco de dados, o arquivo não é um banco de dados!");
        }
        if (
            !(
                await FileSystem.getInfoAsync(
                FileSystem.documentDirectory + 'SQLite',
                )
            ).exists
            ) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite')
        }
        await FileSystem.downloadAsync(
            result.assets[0].uri,
            `${FileSystem.documentDirectory}SQLite/stock.db`,
        );
        Alert.alert('Sucesso', 'Banco importado com sucesso!');
    } catch (error) {
        Alert.alert('Erro', (error as Error).message);
    }
    
}