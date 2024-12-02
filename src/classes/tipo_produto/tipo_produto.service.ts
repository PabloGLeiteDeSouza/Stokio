import { SQLiteDatabase } from 'expo-sqlite';
import { TipoProdutoCreate, TipoProdutoUpdate } from './interfaces';
export default class TipoProdutoService {
  constructor(private db: SQLiteDatabase) {}

  async create(data: TipoProdutoCreate): Promise<number> {
    try {
      const res = await this.db.runAsync(
        'INSERT into tipo_produto ( nome ) VALUES ( $nome )',
        {
          $nome: data.nome,
        },
      );
      if (res.changes < 1) {
        throw new Error('Não foi possível criar o tipo de produto', {
          cause: 'ERR_TIPOPRODUTO_INSERT',
        });
      }
      return res.lastInsertRowId;
    } catch (error) {
      throw error;
    }
  }

  async update(data: TipoProdutoUpdate) {
    try {
      const res = await this.db.runAsync(
        'UPDATE tipo_produto SET nome = $nome WHERE id = $id',
        {
          $nome: data.nome,
          $id: data.id,
        },
      );
      if (res.changes < 1) {
        throw new Error('Não foi possível atualizar o tipo de produto', {
          cause: 'ERR_TIPOPRODUTO_UPDATE',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    const data = await this.db.getAllAsync<TipoProdutoUpdate>(
      'SELECT * FROM tipo_produto',
    );
    return data;
  }

  async getById(id: number) {
    try {
      const data = await this.db.getFirstAsync<TipoProdutoUpdate>(
        'SELECT * FROM tipo_produto WHERE id = $id',
        {
          $id: id,
        },
      );
      if (!data) {
        throw new Error('Não foi possível encontrar o tipo de produto', {
          cause: 'ERR_TIPO_PROD_GETID',
        });
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getByNome(nome: string) {
    try {
      const data = await this.db.getAllAsync<TipoProdutoUpdate>(
        `SELECT * FROM tipo_produto WHERE nome LIKE '%' || $nome || '%'`,
        { $nome: nome },
      );
      if (data.length < 1) {
        throw new Error('Não foi possível encontrar nenhum tipo de produto', {
          cause: 'ERR_TIPO_PROD_GETNOME',
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

  async delete(id: number) {
    try {
      const dados = await this.db.getAllAsync('SELECT * FROM produto WHERE id_tipo_produto == $id', {
        $id: id,
      })
      if (dados.length > 0) {
        throw new Error('Não é possível excluir o tipo do produto pois ele tem produtos associados', {
          cause: 'ERR_TIPO_PRODUTO_DELETE_ASSOCIATED_PRODUCTS',
        });
      }
      await this.db.runAsync('DELETE FROM tipo_produto WHERE id = $id', { $id: id });
    } catch (err) {
      throw err;
    }
  }
}
