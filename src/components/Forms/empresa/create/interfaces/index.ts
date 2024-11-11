import { Ramo } from "@/classes/empresa/types";
import { Pessoa } from "@/types/screens/cliente";
import { SQLiteDatabase } from "expo-sqlite";

type pessoa = Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string }

export interface IFormCreateEmpresa {
    db: SQLiteDatabase;
    onSubmited: () => Promise<void> | void;
    onChangePessoa: (pessoas: Array<pessoa>, selectedPessoa: pessoa) => Promise<void> | void;
    onChangeRamo: (selectedRamo: Ramo) => Promise<void> | void;
    pessoas: Array<pessoa>;
    pessoa?: pessoa | undefined;
    ramo?: Ramo | undefined;
    haveRamos: boolean;
}