import MessageErrors from 'messages-error';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import * as SQLite from 'expo-sqlite';

export class Categoria {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(categoria: CreateCategoriaDto) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO categoria (nome, descricao) VALUES ($nome, $descricao)',
        { $nome: categoria.nome, $descricao: categoria.descricao },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsCategoria.create.database,
        );
      }
      return { ...categoria, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, categoria: UpdateCategoriaDto) {
    try {
      const result = await this.db.runAsync(
        'UPDATE categoria SET nome = $nome, descricao = $descricao WHERE id = $id',
        { $id: id, $nome: categoria.nome, $descricao: categoria.descricao },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsCategoria.update.database,
        );
      }
      return { ...categoria, id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstById(id: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM categoria WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsCategoria.find.byId.database,
        );
      }
      return result as UpdateCategoriaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstByName(nome: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM categoria WHERE nome = $nome',
        { $nome: nome },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsCategoria.find.byName.database,
        );
      }
      return result as UpdateCategoriaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM categoria');
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsCategoria.find.all.database,
        );
      }
      return result as Array<UpdateCategoriaDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete($id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE FROM categoria WHERE id = $id',
        {
          $id,
        },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsCategoria.delete.database,
        );
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
