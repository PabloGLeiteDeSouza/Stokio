import * as SQLite from 'expo-sqlite';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';

export class PessoJuridica {
  private db = SQLite.openDatabaseAsync('stock.db');

  async create(Produto: CreatePessoaJuridicaDto) {
    const { razao_social, cnpj, id_endereco } = Produto;

    try {
      const db = await this.db;
      const data = {
        $cpf: cpf,
        $data_de_nascimento: data_de_nascimento.toDateString(),
      };
      const result = await db.runAsync(
        'INSERT INTO pessoa_fisica (cpf, data_de_nascimento) VALUES ($cpf, $data_de_nascimento)',
        data,
      );
      if (!result) {
        return { error: true };
      }
      return { id: result.lastInsertRowId, ...Produto };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findAll() {
    try {
      const db = await this.db;
      const result = await db.getAllAsync('SELECT * FROM pessoa_fisica');
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findFirstById(id: number) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM pessoa_fisica WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findFirstByCpf(cpf: string) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM pessoa_fisica WHERE cpf = $cpf',
        { $cpf: cpf },
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async update(id: number, PessoaFisica: UpdatePessoaFisicaDto) {
    const { cpf, data_de_nascimento } = PessoaFisica;
    try {
      const db = await this.db;

      const data = {
        $id: id,
        $cpf: cpf,
        $data_de_nascimento: data_de_nascimento.toDateString(),
      };
      const result = await db.runAsync(
        'UPDATE pessoa_fisica SET cpf = $cpf, data_de_nascimento = $data_de_nascimento WHERE id = $id',
        data,
      );
      if (!result) {
        return { error: true };
      }
      return { ...PessoaFisica, id };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async delete(id: number) {
    try {
      const db = await this.db;
      const result = await db.runAsync(
        'DELETE * FROM pessoa_fisica WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        return { error: true };
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }
}
