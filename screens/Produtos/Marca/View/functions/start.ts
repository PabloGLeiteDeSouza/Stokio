import { Marca } from '$classes/marca';
import { UpdateMarcaDto } from '$classes/marca/dto/update-marca.dto';
import { SQLiteDatabase } from 'expo-sqlite';
import { AlertStatic } from 'react-native';

export default async function start(
  db: SQLiteDatabase,
  setMarca: React.Dispatch<React.SetStateAction<Array<UpdateMarcaDto>>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  Alert: AlertStatic,
) {
  try {
    const marca = await new Marca(db).findAll();
    setMarca(marca);
    setIsLoading(false);
  } catch (error) {
    Alert.alert('Erro', (error as Error).message);
    setIsLoading(false);
    throw error;
  }
}
