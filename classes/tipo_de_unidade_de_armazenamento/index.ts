import errors from 'messages-error';
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
        throw new Error(errors.database_errors.ErrosTipoUA.create.database)
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
      const result = await this.db.getFirstAsync(
        'SELECT * FROM tipo_de_unidade_de_armazenamento WHERE id = $id',
        { $id: id },
      );
      if(!result){
        throw new Error(errors.database_errors.ErrosTipoUA.find.byId.database)
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM tipo_de_unidade_de_armazenamento',
      );
      if(!result){
        throw new Error(errors.database_errors.ErrosTipoUA.find.all.database)
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: number,
    tipo_de_unidade_de_armazenamento: UpdateTipoDeUnidadeDeArmazenamentoDto,
  ) {
    try {
      const { nome } = tipo_de_unidade_de_armazenamento;
      const result = await this.db.runAsync(
        'UPDATE tipo_de_unidade_de_armazenamento SET nome = $nome',
        { $nome: nome },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrosTipoUA.update.database);
      }
      return { nome, id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE * tipo_de_unidade_de_armazenamento FROM id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrosTipoUA.delete.database);
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
