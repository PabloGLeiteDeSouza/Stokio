import * as SQLite from 'expo-sqlite';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import MessageErrors from 'messages-error';
import errors from 'messages-error';

export class Empresa {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(empresa: CreateEmpresaDto) {
    try {
      const { cnpj, id_ramo, id_pessoa, nome_fantasia, razao_social } = empresa;
      const data = {
        $nome_fantasia: String(nome_fantasia),
        $razao_social: String(razao_social),
        $cnpj: String(cnpj),
        $id_ramo: Number(id_ramo),
        $id_pessoa: Number(id_pessoa),
      };
      const result = await this.db.runAsync(
        'INSERT INTO empresa (nome_fantasia, razao_social, cnpj, id_ramo, id_pessoa) VALUES ($nome_fantasia, $razao_social, $cnpj, $id_ramo, $id_pessoa)',
        data,
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.create.database,
        );
      }
      return { ...empresa, id: result.lastInsertRowId };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, empresa: UpdateEmpresaDto) {
    try {
      const { cnpj, id, id_pessoa, id_ramo, nome_fantasia, razao_social } =
        empresa;
      const data = {
        $id: id,
        $nome_fantasia: String(nome_fantasia),
        $razao_social: String(razao_social),
        $cnpj: String(cnpj),
        $id_ramo: id_ramo,
        $id_pessoa: id_pessoa,
      };
      const result = await this.db.runAsync(
        'UPDATE empresa SET nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj, id_ramo = $id_ramo, id_pessoa = $id_endereco WHERE id = $id',
        data,
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.update.database,
        );
      }
      return { ...empresa, id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM empresa');
      if (result.length === 0) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.find.all.database,
        );
      }
      return result as Array<UpdateEmpresaDto>;
    } catch (error) {
      throw error;
    }
  }

  async findAllByIdRamo(id_ramo: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM empresa WHERE id_ramo = $id_ramo',
        { $id_ramo: `${id_ramo}` },
      );
      if (result.length === 0) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.find.byNomeFantasia.database,
        );
      }
      return result as Array<UpdateEmpresaDto>;
    } catch (error) {
      console.error('o que deu errado: ', (error as Error).message);
      throw error;
    }
  }

  async findAllByNomeFantasia(nome_fantasia: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM empresa WHERE nome_fantasia LIKE $nome_fantasia',
        { $nome_fantasia: `%${nome_fantasia}%` },
      );
      if (result.length === 0) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.find.byNomeFantasia.database,
        );
      }
      return result as Array<UpdateEmpresaDto>;
    } catch (error) {
      console.error('o que deu errado: ', (error as Error).message);
      throw error;
    }
  }

  async findAllByRazaoSocial(razao_social: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM empresa WHERE razao_social = $razao_social',
        { $razao_social: `%${razao_social}%` },
      );
      if (result.length === 0) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.find.byRazaoSocial.database,
        );
      }
      return result as Array<UpdateEmpresaDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findUniqueByCnpj(cnpj: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM empresa WHERE cnpj LIKE $cnpj',
        { $cnpj: `${cnpj}` },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.find.byCnpj.database,
        );
      }
      return result as UpdateEmpresaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE FROM empresa WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsEmpresa.delete.database,
        );
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByIdPessoa($id_pessoa: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM empresa WHERE id_pessoa = $id_pessoa',
        { $id_pessoa },
      );
      if (result.length < 1) {
        throw new Error(errors.database_errors.ErrorsEmpresa.find.all.database);
      }
      return result as Array<UpdateEmpresaDto>;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmpresaExistsIdPessoa($id_pessoa: number) {
    const result = await this.db.getAllAsync(
      'SELECT * FROM empresa WHERE id_pessoa = $id_pessoa',
      { $id_pessoa },
    );
    if (result.length > 0) {
      return true;
    }
    return false;
  }
}
