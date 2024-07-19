import * as SQLite from 'expo-sqlite';
import { CreateUnidadeDeArmazenamentoDto } from './dto/create-ua.dto';
import { UpdateUnidadeDeArmazenamentoDto } from './dto/update-ua.dto';
import errors from 'messages-error';

export class UnidadeDeArmazenamento {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(UnidadeDeArmazenamento: CreateUnidadeDeArmazenamentoDto) {
    const { nome, descricao, id_tipo_unidade_de_armazenamento } =
      UnidadeDeArmazenamento;
    const data = {
      $nome: nome,
      $descricao: descricao,
      $id_tipo_unidade_de_armazenamento: id_tipo_unidade_de_armazenamento,
    };
    try {
      const result = await this.db.runAsync(
        'INSERT INTO unidade_de_armazenamento (nome, descricao, tipo ) VALUES ($nome, $descricao, $id_tipo_unidade_de_armazenamento)',
        data,
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsUA.create.database);
      }
      return { id: result.lastInsertRowId, ...UnidadeDeArmazenamento };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM unidade_de_armazenamento',
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsUA.find.all.database);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstById($id: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM unidade_de_armazenamento WHERE id = $id',
        { $id },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsUA.find.byId.database);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstByName($nome: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM unidade_de_armazenamento WHERE nome = $nome',
        { $nome },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsUA.find.byNome.database);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByTipo($id_tipo_unidade_de_armazenamento: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM unidade_de_armazenamento WHERE id_tipo_unidade_de_armazenamento = $id_tipo_unidade_de_armazenamento',
        { $id_tipo_unidade_de_armazenamento },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsUA.find.allbyIdTipoUa.database,
        );
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: number,
    UnidadeDeArmazenamento: UpdateUnidadeDeArmazenamentoDto,
  ) {
    const { nome, descricao, id_tipo_unidade_de_armazenamento } =
      UnidadeDeArmazenamento;
    const data = {
      $id: id,
      $nome: nome,
      $descricao: descricao,
      $id_tipo_unidade_de_armazenamento: id_tipo_unidade_de_armazenamento,
    };
    try {
      const result = await this.db.runAsync(
        'UPDATE unidade_de_armazenamento SET nome = $nome, descricao = $descricao, id_tipo_unidade_de_armazenamento = $id_tipo_unidade_de_armazenamento, WHERE id = $id',
        data,
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsUA.update.database);
      }
      return { ...UnidadeDeArmazenamento, id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete($id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE * FROM unidade_de_armazenamento WHERE id = $id',
        { $id },
      );
      if (!result) {
        throw new Error(errors.database_errors.ErrorsUA.delete.database);
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
