import errors from 'messages-error';
import * as SQLite from 'expo-sqlite';
import { CreateTipoProdutoDto } from './dto/create-tipo-de-produto.dto';
import { UpdateTipoDeProdutoDto } from './dto/update-tipo-de-produto.dto';

export class TipoDeUnidadeDeArmazenamento {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(tipo_de_produto: CreateTipoProdutoDto) {
    try {
      const { nome } = tipo_de_produto;
      const result = await this.db.runAsync(
        'INSERT INTO tipo_de_produto (nome) VALUES ($nome)',
        { $nome: nome },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrosTipoUA.create.database);
      }
      return {
        ...tipo_de_produto,
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
        'SELECT * FROM tipo_de_produto WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrosTipoUA.find.byId.database);
      }
      return result as UpdateTipoDeProdutoDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByNome($nome: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM tipo_de_produto WHERE npme = $nome',
        { $nome },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrosTipoUA.find.byNome.database,
        );
      }
      return result as UpdateTipoDeProdutoDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM tipo_de_produto');
      if (!result) {
        throw new Error(errors.database_errors.ErrosTipoUA.find.all.database);
      }
      return result as Array<UpdateTipoDeProdutoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, tipo_de_produto: UpdateTipoDeProdutoDto) {
    try {
      const { nome } = tipo_de_produto;
      const result = await this.db.runAsync(
        'UPDATE tipo_de_produto SET nome = $nome',
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
        'DELETE * tipo_de_produto FROM id = $id',
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
