import { CreateTipoDeUnidadeDeArmazenamento } from './dto/create-tipo-de-unidade-de-armazenamento.dto';
import { UpdateTipoDeUnidadeDeArmazenamentoDto } from './dto/update-tipo-de-unidade-de-armazenamento.dto';
import * as SQLite from 'expo-sqlite';

export class TipoDeUnidadeDeArmazenamento {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(
    tipo_de_unidade_de_armazenamento: CreateTipoDeUnidadeDeArmazenamento,
  ) {
    try {
      const db = await this.db;
      const { nome } = tipo_de_unidade_de_armazenamento;
      const result = await db.runAsync(
        'INSERT INTO tipo_de_unidade_de_armazenamento (nome) VALUES ($nome)',
        { $nome: nome },
      );
      if (!result) {
        throw new Error()
      }
      return {
        ...tipo_de_unidade_de_armazenamento,
        id: result.lastInsertRowId,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM tipo_de_unidade_de_armazenamento WHERE id = $id',
        { $id: id },
      );
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findAll() {
    try {
      const db = await this.db;
      const result = await db.getAllAsync(
        'SELECT * FROM tipo_de_unidade_de_armazenamento',
      );
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async update(
    id: number,
    tipo_de_unidade_de_armazenamento: UpdateTipoDeUnidadeDeArmazenamentoDto,
  ) {
    try {
      const db = await this.db;
      const { nome } = tipo_de_unidade_de_armazenamento;
      const result = await db.runAsync(
        'UPDATE tipo_de_unidade_de_armazenamento SET nome = $nome',
        { $nome: nome },
      );
      if (!result) {
        return { error: true };
      }
      return { nome, id };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async delete(id: number) {
    try {
      const db = await this.db;
      await db.runAsync(
        'DELETE * tipo_de_unidade_de_armazenamento FROM id = $id',
        { $id: id },
      );
      return { sucess: true };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }
}
