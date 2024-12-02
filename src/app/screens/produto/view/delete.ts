import { SQLiteDatabase } from "expo-sqlite";
import { ProductService } from "@classes/produto/produto.service";
import { Alert } from "react-native";

export default async function delete_product(nome: string, id: number, db: SQLiteDatabase, onDelete: () => void) {
    Alert.alert('Aviso', `Você tem certeza que deseja excluir o produto ${nome}?`, [
        {
            text: 'Sim',
            onPress: async () => {
                try {
                    const result = await new ProductService(db).deleteProduto(id);
                    onDelete();
                } catch (error) {
                    Alert.alert('Aviso', (error as Error).message);
                }
            },
        },
        {
            text: 'Não',
            style: 'cancel',
            onPress: () => {
                Alert.alert('Aviso', 'Operacao cancelada com sucesso!');
            }
        }
    ])
}