import { CreateTelefoneDto } from "./dto/create-telefone.dto";
import { UpdateTelefoneDto } from "./dto/update-telefone.dto";
import * as SQLite from "expo-sqlite";

export class Telefone {

    private db = SQLite.openDatabaseAsync('stock.db');

    async create(Telefone: CreateTelefoneDto) {
        try {
            const { telefone, id_empresa } = Telefone;
            const db = await this.db;
            const result = await db.runAsync('INSERT INTO telefone (telefone, id_empresa) VALUES ($telefone, $id_empresa)', { $telefone: telefone, $id_empresa: id_empresa });
            return { ...Telefone, id: result.lastInsertRowId };
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findById(id: number){
        try {
            const db = await this.db;
            const result = db.getFirstAsync('SELECT * FROM telefone WHERE id = $id', { $id: id });
            return result;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findByIdEmpresa(id_empresa: number){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM telefone WHERE id_empresa = $id_empresa', { $id_empresa: id_empresa })
            return result;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findAll(){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM telefone');
            return result;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async update(id: number, Telefone: UpdateTelefoneDto){
        try {
            const { telefone, id_empresa } = Telefone;
            const db = await this.db;
            const result = await db.runAsync('UPDATE telefone SET telefone = $telefone, id_empresa = $id_empresa', { $telefone: telefone, $id_empresa: id_empresa });
            if (!result) {
                return { error: true };
            }
            return { ...Telefone, id };
        } catch (error) {
            console.error(error);
            return { error: true }            
        }
    }

    async delete(id: number) {
        try {
            const db = await this.db;
            await db.runAsync('DELETE FROM telefone WHERE id = $id', { $id: id });
            return { sucess: true }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }
}

