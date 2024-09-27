/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdatePessoaDto } from '$classes/pessoa/dto/update-pessoa.dto';
import { SQLiteDatabase } from 'expo-sqlite';
import { FormikErrors } from 'formik';

export interface SelecionarPessoaProps {
  db: SQLiteDatabase;
  onChangeRamo: (value: UpdatePessoaDto) => void | Promise<void>;
  handleChange: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void;
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  values: {
    nome: string;
    data_de_nascimento: Date;
    cpf: string;
  };
  errors: FormikErrors<{
    nome: string;
    data_de_nascimento: Date;
    cpf: string;
  }>;
}
