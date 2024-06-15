import * as SQLite from "expo-sqlite";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { UpdateEmpresaDto } from "./dto/update-empresa.dto";

export class Empresa {

    private db = SQLite.openDatabaseAsync('stock.db');

    async create(Empresa: CreateEmpresaDto){
        const { ramo } = Empresa;
        const data = {
            $ramo: ramo,
        }
        try {
            const db = await this.db;
            const result = await db.runAsync('INSERT INTO empresa (ramo) VALUES ($ramo)', data);
            if (!result) {
                return { error: true }
            }
            return { id: result.lastInsertRowId, ...Empresa };
        } catch (error) {
            console.error(error);
            return { error: true }
        }
        
    }

    async findAll(){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM empresa');
            if (!result) {
                return { error: true }
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findFirstById(id: number){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM empresa WHERE id = $id', { $id: id });
            if (!result) {
                return { error: true };
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

    async findAllByRamo(ramo: string){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM empresa WHERE ramo = $ramo', {$ramo: ramo});
            if (!result) {
                return { error: true };
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

    async findAllByIdPessoa(id_pessoa: number){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM empresa WHERE id_pessoa = $id_pessoa', {$id_pessoa: id_pessoa});
            if (!result) {
                return { error: true };
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

    async update(id: number, Empresa: UpdateEmpresaDto){
        const { ramo } = Empresa;
        const data = {
            $id: id,
            $ramo: ramo,
        }
        try {
            const db = await this.db;
            const result = await db.runAsync('UPDATE empresa SET ramo = $ramo WHERE id = $id', data);
            if (!result) {
                return { error: true }
            }
            return { ...Empresa, id };
        } catch (error) {
            console.error(error);
            return { error: true }
        }
        
    }

    async delete(id: number){
        try {
            const db = await this.db;
            const result = await db.runAsync('DELETE * FROM empresa WHERE id = $id', { $id: id });
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