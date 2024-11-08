import { IPessoaUpdate } from "@/classes/cliente/interfaces";
import { Pessoa } from "@/types/screens/cliente";
import { SQLiteDatabase } from "expo-sqlite";

export interface IFormCreateCliente {
    pessoa?: Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string };
    pessoas: Array<Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string }>;
    onCreated: () => Promise<void> | void;
    db: SQLiteDatabase;
    onSelectPerson: (pessoas: Array<Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string }>)
}