import * as SQLite from 'expo-sqlite';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import errors from 'messages-error';

export class Marca {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(marca: CreateMarcaDto) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO marca (nome, descricao) VALUES ($nome, $descricao)',
        { $nome: marca.nome, $descricao: String(marca.descricao) },
      );
      if (!result) {
        throw new Error('Não foi possível inserir os dados tente novamente!');
      }
      return { ...marca, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const results = await this.db.getAllAsync('SELECT * FROM marca');
      if (!results) {
        throw new Error(errors.database_errors.ErrorsMarca.find.all.database);
      }
      return results as CreateMarcaDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstbyNome($nome: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM marca WHERE nome = $nome',
        { $nome },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsMarca.find.byNome.database,
        );
      }
      return result as CreateMarcaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstById($id: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM marca WHERE id = $id',
        { $id },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsMarca.find.byId.database);
      }
      return result as CreateMarcaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, marca: UpdateMarcaDto) {
    try {
      const result = await this.db.runAsync(
        'UPDATE marca SET nome = $nome WHERE id = $id',
        { $id: id, $nome: marca.nome },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsMarca.update.database);
      }
      return { ...marca, id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE FROM marca WHERE id = $id',
        {
          $id: id,
        },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsMarca.delete.database);
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
