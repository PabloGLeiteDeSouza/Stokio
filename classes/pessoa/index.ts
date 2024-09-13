import { SQLiteDatabase } from 'expo-sqlite';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

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

  async findUnique() {}

  async findAll() {}

  async findAllByNome() {}

  async findAllByDataDeNascimento() {}

  async findUniqueByNome() {}

  async delete() {}

  async disable() {}
}
