import * as SQLite from "expo-sqlite";

export class Ua {

    private db = SQLite.openDatabaseAsync('stock.db');
    id?: number;
    nome: string;
    descricao: string;
    tipo: string;
    dataCriacao: Date;
    dataAlteracao: Date;
    

    constructor(nome: string, descricao: string, tipo: string, dataCriacao: Date, dataAlteracao: Date, id?: number){
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
        this.dataCriacao = dataCriacao;
        this.dataAlteracao = dataCriacao;
    }

    async create(){
        try {
            const db = await this.db;
            await db.execAsync(`INSERT INTO unidades_de_armazenamento (nome, descricao, tipo, data_de_cricao, data_de_alteracao ) VALUES (${this.nome}, ${this.descricao}, ${this.tipo}, ${this.dataCriacao}, ${this.dataAlteracao})`);
            return { sucess: true }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
        
    }

    async update(){
        try {
            const db = await this.db;
            await db.execAsync(`UPDATE INTO unidades_de_armazenamento (nome, descricao, tipo, data_de_cricao, data_de_alteracao ) VALUES (${this.nome}, ${this.descricao}, ${this.tipo}, ${this.dataCriacao}, ${this.dataAlteracao})`);
            return { sucess: true }
        } catch (error) {
            console.error(error);
            return { error: true }
        }
        
    }

}