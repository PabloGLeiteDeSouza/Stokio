import { Marca } from '$classes/marca';
import { UpdateMarcaDto } from '$classes/marca/dto/update-marca.dto';
import { SQLiteDatabase } from 'expo-sqlite';
import { AlertStatic } from 'react-native';

export default async function search(
  db: SQLiteDatabase,
  search: string,
  setMarca: React.Dispatch<React.SetStateAction<Array<UpdateMarcaDto>>>,
  Alert: AlertStatic,
) {
  try {
    const marcas = await new Marca(db).findFirstbyNome(search);
    setMarca([marcas]);
    Alert.alert('Sucesso!', 'Busca realizada com sucesso!');
  } catch (error) {
    Alert.alert('Error', (error as Error).message);
    throw error;
  }
}
