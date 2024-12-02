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
      return res.lastInsertRowId;
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
      const dados = await this.db.getAllAsync('SELECT * FROM produto WHERE id_marca == $id', {
        $id: id,
      })
      if (dados.length > 0) {
        throw new Error('Não é possível excluir a marca pois ela tem produtos associados', {
          cause: 'ERR_MARCA_DELETE_ASSOCIATED_PRODUCTS',
        });
      }
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

  async getAllByNome (nome: string) {
    try {
      const dados = await this.db.getAllAsync<MarcaUpdate>(`SELECT * FROM marca WHERE nome LIKE '%' || $nome || '%'`,{
        $nome: nome,
      })
      if(dados.length < 1){
        throw new Error("Nao foi possivel encontrar uma marca!");
      }
      return dados;
    } catch (error) {
      throw error;
    }
  }
}
