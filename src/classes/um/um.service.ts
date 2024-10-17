import { SQLiteDatabase } from 'expo-sqlite';
import { UmCreate, UmUpdate } from './interfaces';

export default class UmService {
  constructor(private db: SQLiteDatabase) {}

  async create(um: UmCreate) {
    try {
      const data = await this.db.runAsync(
        'INSERT into unidade_de_medida ( nome, valor ) VALUES ( $nome, $valor )',
        {
          $nome: um.nome,
          $valor: um.valor,
        },
      );
      if (!data) {
        throw new Error('Nao foi possivel criar a unidade de medida!');
      }
      return data.lastInsertRowId;
    } catch (error) {
      throw new Error(
        'Erro na criacao da unidade de medida: ' + (error as Error).message,
      );
    }
  }

  async update(um: UmUpdate) {
    try {
      const data = await this.db.runAsync(
        'UPDATE unidade_de_medida SET  nome = $nome, valor = $valor WHERE id = $id',
        {
          $nome: um.nome,
          $valor: um.valor,
          $id: um.id,
        },
      );
      if (!data) {
        throw new Error('Nao foi possivel atualizar a unidade de medida!');
      }
      return data.lastInsertRowId;
    } catch (error) {
      throw new Error(
        'Erro na atualizacao da unidade de medida: ' + (error as Error).message,
      );
    }
  }

  async getById(id: string) {
    try {
      const data = await this.db.getFirstAsync<UmUpdate>(
        'SELECT * FROM unidade_de_medida WHERE id == $id',
        { $id: id },
      );
      if (!data) {
        throw new Error('Nao foi possivel encontrar a unidade de medida!');
      }
      return data;
    } catch (error) {
      throw new Error(
        'Erro ao buscar a unidade de medida: ' + (error as Error).message,
      );
    }
  }

  async getAll() {
    try {
      const data = await this.db.getAllAsync<UmUpdate>(
        'SELECT * FROM unidade_de_medida',
      );
      if (data.length < 1) {
        throw new Error('Nao foram encontradas unidades de medida!');
      }
      return data;
    } catch (error) {
      throw new Error(
        'Erro ao buscar unidades de medida: ' + (error as Error).message,
        {
          cause: 'ERR_UM_GETALL',
        },
      );
    }
  }

  async getByNome(nome: string) {
    try {
      const data = await this.db.getAllAsync<UmUpdate>(
        `SELECT * FROM unidade_de_medida WHERE nome LIKE '%' || $nome || '%'`,
        { $nome: nome },
      );
      if (data.length < 1) {
        throw new Error(
          'Nao foi possivel encontrar nenhuma unidade de medida!',
        );
      }
      return data;
    } catch (error) {
      throw new Error(
        `Erro ao buscar unidade de medida: ${(error as Error).message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      const data = await this.db.runAsync(
        `DELETE FROM unidade_de_medida WHERE id = $id`,
        { $id: id },
      );
      if (data.changes < 1) {
        throw new Error('Nao foi possivel deletar a unidade de medida!');
      }
    } catch (error) {
      throw new Error(
        `Erro ao deletar unidade de medida: ${(error as Error).message}`,
      );
    }
  }

  async haveUms() {
    const data = await this.db.getAllAsync('SELECT * from unidade_de_medida');
    if (data.length < 1) {
      return false;
    }
    return true;
  }
}
