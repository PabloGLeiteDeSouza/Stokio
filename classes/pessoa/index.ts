import { SQLiteDatabase } from 'expo-sqlite';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import errors from 'messages-error';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

export class Pessoa {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(pessoa: CreatePessoaDto) {
    try {
      const data = await this.db.runAsync(
        'INSERT into pessoa (nome, data_de_nascimento, cpf) VALUES ($nome, $data_de_nascimento, $cpf)',
        {
          $nome: String(pessoa.nome),
          $data_de_nascimento: String(pessoa.data_de_nascimento),
          $cpf: String(pessoa.cpf),
        },
      );
      if (data.changes < 1) {
        throw new Error('Não foi possível cadastrar a pessoa tente novamente!');
      }
      return { ...pessoa, id: data.lastInsertRowId };
    } catch (error) {
      throw error;
    }
  }

  async update() {}

  async findById(id: number) {
    try {
      const data = await this.db.getFirstAsync(
        'SELECT * FROM pessoa WHERE id = $id',
        { $id: id },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsPessoa.find.all.database);
      }
      return data as UpdatePessoaDto;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const data = await this.db.getAllAsync('SELECT * FROM pessoa');
      if (data.length < 1) {
        throw new Error(errors.database_errors.ErrorsPessoa.find.all.database);
      }
      return data as Array<UpdatePessoaDto>;
    } catch (error) {
      throw error;
    }
  }

  async findAllByNome() {}

  async findAllByDataDeNascimento() {}

  async findUniqueByNome() {}

  async delete($id: number) {
    try {
      const data = await this.db.runAsync('DELETE FROM pessoa WHERE id = $id', { $id });
      if (!data) {
        throw new Error(errors.database_errors.ErrorsPessoa.delete.database);
      }
      return { sucess: true };
    } catch (error) {
      throw error;
    }
  }

  async disable() {}
}
