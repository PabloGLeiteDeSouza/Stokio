import * as SQLite from 'expo-sqlite';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { DBErros } from 'messages-error';

export class Endereco {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(endereco: CreateEnderecoDto) {
    const { logradouro, numero, cep, complemento, bairro, cidade, UF } =
      endereco;
    const data = {
      $logradouro: logradouro,
      $numero: numero,
      $cep: cep,
      $complemento: complemento,
      $bairro: bairro,
      $cidade: cidade,
      $UF: UF,
    };
    try {
      const result = await this.db.runAsync(
        'INSERT INTO endereco (logradouro, numero, cep, complemento, bairro, cidade, UF) VALUES ($logradouro, $numero, $cep, $complemento, $bairro, $cidade, $UF)',
        data,
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.create.database);
      }
      return { ...endereco, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(endereco: UpdateEnderecoDto) {
    const { logradouro, numero, cep, complemento, bairro, cidade, UF } =
      endereco;
    const data = {
      $logradouro: logradouro,
      $numero: numero,
      $cep: cep,
      $complemento: complemento,
      $bairro: bairro,
      $cidade: cidade,
      $UF: UF,
    };
    try {
      const result = await this.db.runAsync(
        'UPDATE SET logradouro = $logradouro, numero = $numero, cep = $cep, complemento = $complemento, bairro = $bairro, cidade = $cidade, UF = $UF',
        data,
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.update.database);
      }
      return { ...endereco, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM endereco');
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.find.all.database);
      }
      return result as Array<UpdateEnderecoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById($id: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM endereco WHERE id = $id',
        { $id },
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.find.byId.database);
      }
      return result as UpdateEnderecoDto;
    } catch (error) {
      throw error;
    }
  }

  async findAllByCep($cep: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM endereco WHERE cep = $cep',
        { $cep },
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.find.byCep.database);
      }
      return result as Array<UpdateEnderecoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByLogradouro(logradouro: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM endereco WHERE logradouro = $logradouro',
        { $logradouro: logradouro },
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.find.bylogradouro.database);
      }
      return result as Array<UpdateEnderecoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByBairro(bairro: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM endereco WHERE bairro = $bairro',
        { $bairro: bairro },
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.find.byBairro.database);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByCidade(cidade: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM endereco WHERE cidade = $cidade',
        { $cidade: cidade },
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.find.byCidade.database);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE * FROM endereco WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(DBErros.ErrorsEndereco.delete.database);
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
