
import * as SQLite from "expo-sqlite";
import { CreateMarcaDto } from "./dto/create-marca.dto";
import { UpdateMarcaDto } from "./dto/update-marca.dto";


export class Marca {

    private db: SQLite.SQLiteDatabase;

    constructor(db: SQLite.SQLiteDatabase){
      this.db = db;
    }

    async create(marca: CreateMarcaDto){
        try {
            const db = await this.db;
            const result = await db.runAsync('INSERT INTO marca (nome) VALUES ($nome)', {$nome: marca.nome});
            if (!result) {
                throw new Error('Não foi possível inserir os dados tente novamente!')
            }
            return { ...marca, id: result.lastInsertRowId };
        } catch (error) {
            console.error(error);
            await (await this.db).closeAsync();
            throw error;
        }
    }

    async findAll(){
        try {
            const db = await this.db;
            const results = await db.getAllAsync('SELECT * FROM marca');
            if (!results) {
                return { error: true }
            }
            return results as CreateMarcaDto[];
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findFirstById(id: number){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM marca WHERE id = $id', { $id: id });
            if (!result) {
                return { error: true }
            }
            return result as CreateMarcaDto;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async update(id: number, marca: UpdateMarcaDto){
        try {
            const db = await this.db;
            const result = await db.runAsync('UPDATE marca SET nome = $nome WHERE id = $id', { $id: id, $nome: marca.nome});
            if (!result) {
                return { error: true };
            }
            return { ...marca, id };
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async delete(id: number){
        try {
            const db = await this.db;
            const result = await db.runAsync('DELETE FROM marca WHERE id = $id', { $id: id });
            if (!result) {
                return { error: true }
            }
            return { sucess: true }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

}