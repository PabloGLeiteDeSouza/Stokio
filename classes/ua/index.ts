import * as SQLite from "expo-sqlite";
import { CreateUaDto } from "./dto/create-ua.dto";
import { UpdateUaDto } from "./dto/update-ua.dto";

export class Ua {

    private db = SQLite.openDatabaseAsync('stock.db');

    async create(Ua: CreateUaDto){
        const { nome, descricao, tipo } = Ua;
        const data = {
            $nome: nome,
            $descricao: descricao,
            $tipo: tipo,
        }
        try {
            const db = await this.db;
            const result = await db.runAsync('INSERT INTO unidade_de_armazenamento (nome, descricao, tipo ) VALUES ($nome, $descricao, $tipo)', data);
            if (!result) {
                return { error: true }
            }
            return { id: result.lastInsertRowId, ...Ua };
        } catch (error) {
            console.error(error);
            return { error: true }
        }
        
    }

    async findAll(){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM unidade_de_armazenamento');
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
            const result = await db.getFirstAsync('SELECT * FROM unidade_de_armazenamento WHERE id = $id', { $id: id });
            if (!result) {
                return { error: true };
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

    async findFirstByName(nome: string){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM unidade_de_armazenamento WHERE nome = $nome', { $nome: nome });
            if (!result) {
                return { error: true };
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

    async findAllByTipo(tipo: string){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM unidade_de_armazenamento WHERE tipo = $tipo', {$tipo: tipo});
            if (!result) {
                return { error: true };
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

    async update(Ua: UpdateUaDto){
        const { id, nome, descricao, tipo } = Ua;
        const data = {
            $id: id,
            $nome: nome,
            $descricao: descricao,
            $tipo: tipo,
        }
        try {
            const db = await this.db;
            const result = await db.runAsync('UPDATE unidade_de_armazenamento SET nome = $nome, descricao = $descricao, tipo = $tipo, WHERE id = $id', data);
            if (!result) {
                return { error: true }
            }
            return Ua;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
        
    }

    async delete(id: number){
        try {
            const db = await this.db;
            const result = await db.runAsync('DELETE * FROM unidade_de_armazenamento WHERE id = $id', { $id: id });
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