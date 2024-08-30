import { SQLiteDatabase } from 'expo-sqlite';
import { UpdateRamoDto } from './dto/update-ramo.dto';
import errors from 'messages-error';
import MessagesSuccess from 'messages-success';

export class Ramo {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(ramo: UpdateRamoDto) {
    try {
      const data = await this.db.runAsync(
        'INSERT INTO ramo (nome, descricao) VALUES ($nome, $descricao)',
        { $nome: ramo.nome, $descricao: String(ramo.descricao) },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsRamo.create.database);
      }
      return { ...ramo, id: data.lastInsertRowId } as UpdateRamoDto;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, ramo: UpdateRamoDto) {
    try {
      const data = await this.db.runAsync(
        'UPDATE ramo set nome = $nome, descricao = $descricao WHERE id = $id',
        {
          $nome: ramo.nome,
          $descricao: String(ramo.descricao),
          $id: String(id),
        },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsRamo.update.database);
      }
      return { ...ramo, id: data.lastInsertRowId } as UpdateRamoDto;
    } catch (error) {
      throw error;
    }
  }

  async findUniqueById($id: number) {
    try {
      const data = await this.db.getFirstAsync(
        'SELECT * FROM ramo WHERE id = $id',
        { $id },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsRamo.find.byId.database);
      }
      return data as UpdateRamoDto;
    } catch (error) {
      throw error;
    }
  }

  async findUniqueByNome($nome: string) {
    try {
      const data = await this.db.getFirstAsync(
        'SELECT * FROM ramo WHERE nome = $nome',
        { $nome },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsRamo.find.byNome.database);
      }
      return data as UpdateRamoDto;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const data = await this.db.getAllAsync('SELECT * FROM ramo');
      if (!data) {
        throw new Error(errors.database_errors.ErrorsRamo.find.byId.database);
      }
      return data as Array<UpdateRamoDto>;
    } catch (error) {
      throw error;
    }
  }

  async remover($id: number) {
    try {
      const data = await this.db.runAsync('DELETE FROM ramo WHERE id = $id', {
        $id,
      });
      if (!data) {
        throw new Error(errors.database_errors.ErrorsRamo.delete.database);
      }
      return { sucess: true, message: MessagesSuccess.remove.ramo };
    } catch (error) {
      throw error;
    }
  }
}
