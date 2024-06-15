import * as SQLite from 'expo-sqlite';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

export class Pessoa {
  private db = SQLite.openDatabaseAsync('stock.db');

  async create(Pessoa: CreatePessoaDto) {
    const {
      nome
    } = Pessoa;
    
    try {
        const db = await this.db;
        const data = {
            $nome: nome,
            
        };
        const result = await db.runAsync(
            'INSERT INTO pessoa (nome) VALUES ($nome)',
            data,
        );
      
        if (!result) {
            return { error: true };
        }
        return { id: result.lastInsertRowId, ...Pessoa };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findAll() {
    try {
      const db = await this.db;
      const result = await db.getAllAsync(
        'SELECT * FROM produto',
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

  async findFirstById(id: number) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM produto WHERE id = $id',
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

  async findFirstByName(nome: string) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM produto WHERE nome = $nome',
        { $nome: nome },
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

  async update(id: number, Pessoa: UpdatePessoaDto) {
    const { nome } = Pessoa;
    const data = {
      $id: id,
      $nome: nome,
    };
    try {
      const db = await this.db;
      const result = await db.runAsync(
        'UPDATE pessoa SET nome = $nome WHERE id = $id',
        data,
      );
      if (!result) {
        return { error: true };
      }
      return Pessoa;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async delete(id: number) {
    try {
      const db = await this.db;
      const result = await db.runAsync(
        'DELETE * FROM pessoa WHERE id = $id',
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
