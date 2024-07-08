import { CreateCategotiaDto } from "./dto/create-categoria.dto";
import { UpdateCategoroaDto } from "./dto/update-categoria.dto";
import * as SQLite from "expo-sqlite";

export class Categoria {

    private db = SQLite.openDatabaseAsync('stock');

    async create(categoria: CreateCategotiaDto){
        try {
            const db = await this.db;
            const result = await db.runAsync('INSERT INTO categoria (nome) VALUES ($nome)', { $nome: categoria.nome });
            if (!result) {
                return { error: true }
            }
            return { ...categoria, id: result.lastInsertRowId }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async update(id: number, categoria: UpdateCategoroaDto){
        try {
            const db = await this.db;
            const result = await db.runAsync('UPDATE categoria SET nome = $nome WHERE id = $id', { $id: id, $nome: categoria.nome });
            if (!result) {
                return { error: true }
            }
            return { ...categoria, id: id }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findFirstById(id: number){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM categoria WHERE id = $id', { $id: id});
            if (!result) {
                return { error: true }
            }
            return result;
        } catch(error){
            console.error(error);
            return { error: true }
        }
    }

    async findFirstByName(nome: string){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM categoria WHERE nome = $nome', { $nome: nome });
            if(!result){
                return { error: true }
            }
            return result;
        } catch(error){
            console.error(error);
            return { error: true }
        }
    }

    async findAll(){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM categoria');
            if (!result) {
                return { error: true }
            }
            return result;
        } catch(error) {
            console.error(error);
            return { error: true }
        }
    }

    async delete(id: number){
        try {
            const db = await this.db;
            const result = await db.runAsync('DELETE FROM categoria WHERE id = $id', { $id: id });
            if (!result) {
                return { error: true }
            }
            return { sucess: true }
        } catch(error){
            console.error(error);
            return { error: true }
        }

    }
}