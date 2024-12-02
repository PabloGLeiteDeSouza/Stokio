import Sharing from 'expo-sharing';
import FileSystem from 'expo-file-system'

export default async function export_database() {
    await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/stock.db')
}