import * as SQLite from "expo-sqlite";
import { CreateUnidadeDeArmazenamentoDto } from "./dto/create-ua.dto";
import { UpdateUnidadeDeArmazenamentoDto } from "./dto/update-ua.dto";

export class UnidadeDeArmazenamento {

    private db: SQLite.SQLiteDatabase;

    constructor(db: SQLite.SQLiteDatabase){
      this.db = db;
    }

    async create(UnidadeDeArmazenamento: CreateUnidadeDeArmazenamentoDto){
        const { nome, descricao, id_tipo_unidade_de_armazenamento } = UnidadeDeArmazenamento;
        const data = {
            $nome: nome,
            $descricao: descricao,
            $id_tipo_unidade_de_armazenamento: id_tipo_unidade_de_armazenamento,
        }
        try {
            const db = await this.db;
            const result = await db.runAsync('INSERT INTO unidade_de_armazenamento (nome, descricao, tipo ) VALUES ($nome, $descricao, $id_tipo_unidade_de_armazenamento)', data);
            if (!result) {
                return { error: true }
            }
            return { id: result.lastInsertRowId, ...UnidadeDeArmazenamento };
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

    async findAllByTipo(id_tipo_unidade_de_armazenamento: number){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM unidade_de_armazenamento WHERE id_tipo_unidade_de_armazenamento = $id_tipo_unidade_de_armazenamento', {$id_tipo_unidade_de_armazenamento: id_tipo_unidade_de_armazenamento});
            if (!result) {
                return { error: true };
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

    async update(id: number, UnidadeDeArmazenamento: UpdateUnidadeDeArmazenamentoDto){
        const { nome, descricao, id_tipo_unidade_de_armazenamento } = UnidadeDeArmazenamento;
        const data = {
            $id: id,
            $nome: nome,
            $descricao: descricao,
            $id_tipo_unidade_de_armazenamento: id_tipo_unidade_de_armazenamento,
        }
        try {
            const db = await this.db;
            const result = await db.runAsync('UPDATE unidade_de_armazenamento SET nome = $nome, descricao = $descricao, id_tipo_unidade_de_armazenamento = $id_tipo_unidade_de_armazenamento, WHERE id = $id', data);
            if (!result) {
                return { error: true }
            }
            return {...UnidadeDeArmazenamento, id};
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