import { SQLiteDatabase } from 'expo-sqlite';
import { TelefoneData } from './types';

export class TelefoneService {
  constructor(private db: SQLiteDatabase) {}

  async getAllTelefones(): Promise<Array<TelefoneData>> {
    try {
      const res = await this.db.getAllAsync<TelefoneData>(
        'SELECT * FROM telefone',
      );
      if (res.length < 1) {
        throw new Error('Não foi possível encontrar nenhum número!');
      }
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getTelefoneById($id: number): Promise<TelefoneData> {
    try {
      const res = await this.db.getFirstAsync<TelefoneData>(
        'SELECT * FROM telefone WHERE id = $id',
        {
          $id,
        },
      );
      if (!res) {
        throw new Error('Não foi possível encontrar o número!');
      }
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getTelefoneByNumero($numero: number): Promise<TelefoneData> {
    try {
      const res = await this.db.getFirstAsync<TelefoneData>(
        'SELECT * FROM telefone WHERE numero = $numero',
        {
          $numero,
        },
      );
      if (!res) {
        throw new Error('Não foi possível encontrar o número!');
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
}
