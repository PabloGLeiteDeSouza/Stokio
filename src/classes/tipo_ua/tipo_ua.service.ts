import { SQLiteDatabase } from 'expo-sqlite';
import { TipoUaCreate, TipoUaUpdate } from './interfaces';

export default class TipoUaService {
  constructor(private db: SQLiteDatabase) {}

  async create(data: TipoUaCreate) {
    try {
      const res = await this.db.runAsync(
        'INSERT into tipo_ua ( nome, descricao ) VALUES ( $nome, $descricao )',
        {
          $nome: data.nome,
          $descricao: data.descricao,
        },
      );
      if (res.changes < 1) {
        throw new Error(
          'Não foi possível criar o tipo de unidade de armazenamento',
          {
            cause: 'ERR_TipoUa_INSERT',
          },
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async update(data: TipoUaUpdate) {
    try {
      const res = await this.db.runAsync(
        'UPDATE tipo_ua SET nome = $nome, descricao = $descricao WHERE id = $id',
        {
          $nome: data.nome,
          $descricao: data.descricao,
          $id: data.id,
        },
      );
      if (res.changes < 1) {
        throw new Error(
          'Não foi possível atualizar o tipo de unidade de armazenamento',
          {
            cause: 'ERR_TipoUa_UPDATE',
          },
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const dados = await this.db.getAllAsync('SELECT * FROM ua WHERE id_tipo_ua == $id', {
        $id: id,
      })
      if (dados.length > 0) {
        throw new Error(
          'Não foi possível excluir o tipo de unidade de armazenamento pois há unidades de armazenamento associadas a ele',
          {
            cause: 'ERR_TipoUa_DELETE',
          },
        );
      }
      const res = await this.db.runAsync('DELETE FROM tipo_ua WHERE id = $id', {
        $id: id,
      });
      if (res.changes < 1) {
        throw new Error(
          'Não foi possível deletar o tipo de unidade de armazenamento',
          {
            cause: 'ERR_TipoUa_DELETE',
          },
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    const data = await this.db.getAllAsync<TipoUaUpdate>(
      'SELECT * FROM tipo_ua',
    );
    return data;
  }

  async getId(id: number) {
    try {
      const data = await this.db.getFirstAsync<TipoUaUpdate>(
        'SELECT * FROM tipo_ua WHERE id = $id',
        { $id: id },
      );
      if (!data) {
        throw new Error(
          'Não foi possível encontrar o tipo de unidade de armazenamento',
          {
            cause: 'ERR_TipoUa_GETID',
          },
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getNome(nome: string) {
    try {
      const data = await this.db.getAllAsync<TipoUaUpdate>(
        `SELECT * FROM tipo_ua WHERE nome LIKE '%' || $nome || '%'`,
        { $nome: nome },
      );
      if (data.length <= 0) {
        throw new Error(
          'Não foi possível encontrar o tipo de unidade de armazenamento',
          {
            cause: 'ERR_TipoUa_GETNOME',
          },
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async haveTipoUa() {
    const data = await this.db.getAllAsync('SELECT * FROM tipo_ua');
    if (data.length < 1) {
      return false;
    }
    return true;
  }
}
