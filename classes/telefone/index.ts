import { db_error_messages } from '$constants/messages/errors/databse';
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
      const db = await this.db;
      const result = await db.runAsync(
        'INSERT INTO telefone (telefone, id_empresa) VALUES ($telefone, $id_empresa)',
        { $telefone: telefone, $id_empresa: id_empresa },
      );
      if (!result) {
        throw new Error('Não foi possível realizar a inserção!');
      }
      return { ...Telefone, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const db = await this.db;
      const result = db.getFirstAsync('SELECT * FROM telefone WHERE id = $id', {
        $id: id,
      });
      if (!result) {
        throw new Error('Não foi possível realizar a seleção!');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByIdEmpresa(id_empresa: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM telefone WHERE id_empresa = $id_empresa',
        { $id_empresa: id_empresa },
      );
      if (!result) {
        throw new Error('Não foi possível realizar a seleção!');
      }
      return result as Array<UpdateTelefoneDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM telefone');
      if (!result) {
        throw new Error('Não foi possível realizar a seleção!');
      }
      return result as Array<UpdateTelefoneDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update($id: number, Telefone: UpdateTelefoneDto) {
    try {
      const $telefone = Telefone.telefone,
        $id_empresa = Telefone.id_empresa;
      const result = await this.db.runAsync(
        'UPDATE telefone SET telefone = $telefone, id_empresa = $id_empresa WHERE id = $id',
        { $telefone, $id_empresa, $id },
      );
      if (!result) {
        if (!result) {
          throw new Error(db_error_messages.ErrorsTelefone.update.database);
        }
      }
      return { ...Telefone, id: $id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const db = await this.db;
      await db.runAsync('DELETE FROM telefone WHERE id = $id', { $id: id });
      return { sucess: true };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }
}
