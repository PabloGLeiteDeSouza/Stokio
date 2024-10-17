import { SQLiteDatabase } from 'expo-sqlite';
import { MarcaUpdate } from './interfaces';

export default class MarcaService {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    try {
      const data = await this.db.getAllAsync<MarcaUpdate>(
        'SELECT * FROM marca',
      );
      if (data.length < 1) {
        throw new Error('Não foi possível encontrar nenhuma marca', {
          cause: 'ERR_MARCA_GETALL',
        });
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async haveMarca() {
    const data = await this.db.getAllAsync('SELECT * FROM marca');
    if (data.length < 1) {
      return false;
    }
    return true;
  }
}
