import { SQLiteDatabase } from 'expo-sqlite';
import { MarcaCreate, MarcaUpdate } from './interfaces';

export default class MarcaService {
  constructor(private db: SQLiteDatabase) {}

  async create(data: MarcaCreate) {
    try {
      const res = await this.db.runAsync(
        'INSERT into marca ( nome ) VALUES ( $nome )',
        {
          $nome: data.nome,
        },
      );
      if (res.changes < 1) {
        throw new Error('Não foi possível criar a marca', {
          cause: 'ERR_MARCA_INSERT',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async update(data: MarcaUpdate) {
    try {
      const res = await this.db.runAsync(
        'UPDATE marca SET nome = $nome WHERE id = $id',
        {
          $nome: data.nome,
          $id: data.id,
        },
      );
      if (res.changes < 1) {
        throw new Error('Não foi possível atualizar a marca', {
          cause: 'ERR_MARCA_UPDATE',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const res = await this.db.runAsync('DELETE FROM marca WHERE id = $id', {
        $id: id,
      });
      if (res.changes < 1) {
        throw new Error('Não foi possível deletar a marca', {
          cause: 'ERR_MARCA_DELETE',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    const data = await this.db.getAllAsync<MarcaUpdate>(
      'SELECT * FROM marca',
    );
    return data;
  }

  async getId(id: number) {
    try {
      const data = await this.db.getFirstAsync<MarcaUpdate>('SELECT * FROM marca WHERE id = $id', { $id: id });
      if (!data) {
        throw new Error("Nao foi possivel encontrar uma marca!");
      }
      return data;
    } catch (err) {
      throw err;
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
