import { SQLiteDatabase } from "expo-sqlite";

export interface IFormCreateCliente {
    id_pessoa?: number;
    havePessoas: boolean;
    onCreated: () => Promise<void> | void;
    db: SQLiteDatabase;
    onSelectPerson: (id_pessoa?: number) => Promise<void> | void;
}