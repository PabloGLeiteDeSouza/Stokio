import CompraService from "@/classes/compra/compra.service";
import { SQLiteDatabase } from "expo-sqlite";
import { Alert } from "react-native";

export default async function delete_compra(id: number, db: SQLiteDatabase, callback: () => void) {
    try {
        Alert.alert('Aviso', `Voce deseja mesmo deletar a compra?`, [
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await new CompraService(db).delete(id);
                        Alert.alert('Aviso', 'Compra deletada com sucesso!', [
                            {
                                text: 'Ok',
                                onPress: () => callback()
                            }
                        ])
                    } catch (error) {
                        Alert.alert('Aviso', (error as Error).message);
                    }
                }
            },
            {
                text: 'Não',
                onPress: () => Alert.alert('Aviso', 'Operacao cancelada!')
            }
        ])
    } catch (error) {
        Alert.alert('Aviso', (error as Error).message)
    }
}