import * as SQLite from 'expo-sqlite';
import { CreateUmDto } from './dto/create-um.dto';
import MessageErrors from "messageerrors";
import { UpdateUmDto } from './dto/update-um.dto';

export class Um {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(um: CreateUmDto){
    try {
        const {nome} = um;
        const result = await this.db.runAsync("INSERT INTO unidade_de_medida (nome) VALUES ($nome)", {$nome: nome});
        if (!result) {
            throw new Error(MessageErrors.database_errors.ErrorsUM.create.database)
        }
        return { nome, id: result.lastInsertRowId };
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  async update($id: number, um: UpdateUmDto){
    try {
        const {nome} = um;
        const result = await this.db.runAsync("UPDATE unidade_de_medida SET nome = $nome WHERE id = $id", {$id, $nome: nome});
        if (!result) {
            throw new Error(MessageErrors.database_errors.ErrorsUM.update.database);
        }
        return { nome, id: $id };
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  async findAll(){
    try {
        const result = await this.db.getAllAsync('SELECT * FROM unidade_de_medida');
        if (!result) {
            throw new Error(MessageErrors.database_errors.ErrorsUM.find.all.database);
        }
        return result as Array<UpdateUmDto>;
    } catch (error) {
        throw error;
    }
  }

  async findFirstById($id: number){
    try {
        const result = await this.db.getFirstAsync('SELECT * FROM unidade_de_medida WHERE id = $id', {$id});
        if (!result) {
            throw new Error(MessageErrors.database_errors.ErrorsUM.find.byId.database);
        }
        return result as UpdateUmDto;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  async findFirstByName($nome: string){
    try {
        const result = await this.db.getFirstAsync('SELECT * FROM unidades_de_medida WHERE nome = $nome', {$nome});
        if (!result) {
            throw new Error(MessageErrors.database_errors.ErrorsUM.find.byNome.database);
        }
        return result as UpdateUmDto;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  async delete($id: number){
    try {
        const result = await this.db.runAsync('DELETE FROM unidades_de_medida WHERE id = $id', {$id});
        if (!result) {
            throw new Error(MessageErrors.database_errors.ErrorsUM.delete.database);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
  }
}
