import { SQLiteDatabase } from 'expo-sqlite';
import { TipoProdutoUpdate } from './interfaces';
export default class TipoProdutoService {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    try {
      const data = await this.db.getAllAsync<TipoProdutoUpdate>(
        'SELECT * FOM tipo_produto',
      );
      if (data.length < 1) {
        throw new Error('Não foi possível encontrar nenhum tipo de produto', {
          cause: 'ERR_TIPO_PROD_GETALL',
        });
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async haveTipoProduto() {
    const data = await this.db.getAllAsync('SELECT * FROM tipo_produto');
    if (data.length < 1) {
      return false;
    }
    return true;
  }
}
