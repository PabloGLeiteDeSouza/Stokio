import { Pessoa } from "@/types/screens/cliente";
import { SQLiteDatabase } from "expo-sqlite";

export interface IFormCreateCliente {
    pessoa?: Omit<Pessoa, 'data_nascimento'> & { data_nascmento: string };
    onCreated: () => Promise<void> | void;
    db: SQLiteDatabase;
}