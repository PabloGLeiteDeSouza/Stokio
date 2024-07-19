import errors from 'messages-error';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';
import * as SQLite from 'expo-sqlite';

export class Telefone {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(Telefone: CreateTelefoneDto) {
    try {
      const { telefone, id_empresa } = Telefone;
      const result = await this.db.runAsync(
        'INSERT INTO telefone (telefone, id_empresa) VALUES ($telefone, $id_empresa)',
        { $telefone: telefone, $id_empresa: id_empresa },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsTelefone.create.database);
      }
      return { ...Telefone, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById($id: number) {
    try {
      const result = this.db.getFirstAsync(
        'SELECT * FROM telefone WHERE id = $id',
        {
          $id,
        },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsTelefone.find.byId.database,
        );
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByIdEmpresa($id_empresa: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM telefone WHERE id_empresa = $id_empresa',
        { $id_empresa },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsTelefone.find.allbyIdEmpresa.database,
        );
      }
      return result as UpdateTelefoneDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM telefone');
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsTelefone.find.all.database,
        );
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, Telefone: UpdateTelefoneDto) {
    try {
      const { telefone, id_empresa } = Telefone;
      const result = await this.db.runAsync(
        'UPDATE telefone SET telefone = $telefone, id_empresa = $id_empresa WHERE id = $id',
        { $telefone: telefone, $id_empresa: id_empresa, $id: id },
      );
      if (!result) {
        if (!result) {
          throw new Error(
            errors.database_errors.ErrorsTelefone.update.database,
          );
        }
      }
      return { ...Telefone, id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete($id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE FROM telefone WHERE id = $id',
        { $id },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsTelefone.delete.database);
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
