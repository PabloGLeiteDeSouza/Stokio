import * as SQLite from "expo-sqlite";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { CreateEmailDto } from "./dto/create-email.dto";

export class Email {
    
    private db: SQLite.SQLiteDatabase;

    constructor(db: SQLite.SQLiteDatabase){
      this.db = db;
    }

    async create(email: CreateEmailDto){
        try {
            const result = await this.db.runAsync('INSERT INTO email (email, id_empresa) VALUES ($email, $id_empresa)', { $email: email.email, $id_empresa: email.id_empresa })
            if (!result) {
                throw new Error('Não possível executar a inserção tente novamente!')
            }
            return { ...email, id: result.lastInsertRowId }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id: number, email: UpdateEmailDto){
        try {
            const result = await this.db.runAsync('UPDATE email SET email = $email, id_pessoa = $id_pessoa WHERE id = $id', { $email: email.email, $id_empresa: email.id_empresa, $id: id });
            if (!result) {
                throw new Error('Não foi possível fazer a atualização!')
            }
            return { ...email, id }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findFirstById(id: number){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM email WHERE id = $id', {$id: id});
            if (!result) {
                return { error: true }
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findFirstByIdEmpresa(id_empresa: number){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM email WHERE id_empresa = $id_empresa', {$id_empresa: id_empresa});
            if (!result) {
                return { error: true }
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findFirstByEmail(email: string){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync('SELECT * FROM email WHERE email = $email', {$email: email});
            if (!result) {
                return { error: true }
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }

    async findAll(){
        try {
            const db = await this.db;
            const result = await db.getAllAsync('SELECT * FROM email');
            if (!result) {
                return { error: true }
            }
            return result;
        } catch (error) {
            
        }
    }

    async delete(id: number){
        try {
            const db = await this.db;
            await db.runAsync('DELETE FROM email WHERE id = $id', {$id: id});
            return { sucess: true }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
    }
}