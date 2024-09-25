import { ClientesObject } from '$screens/Clientes/types';
import { SQLiteDatabase } from 'expo-sqlite';

export interface SearchClientesProps {
  db: SQLiteDatabase;
  onSearchValues: (result: Array<ClientesObject>) => void | Promise<void>;
}
