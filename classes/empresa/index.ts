import * as SQLite from 'expo-sqlite';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

export class Empresa {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(empresa: CreateEmpresaDto) {
    try {
      const {
        nome_completo,
        data_de_nascimento,
        cpf,
        cnpj,
        id_endereco,
        nome_fantasia,
        razao_social,
      } = empresa;
      if (cnpj) {
        const data = {
          $nome_fantasia: String(nome_fantasia),
          $razao_social: String(razao_social),
          $cnpj: String(cnpj),
          $id_endereco: Number(id_endereco),
        };
        const result = await this.db.runAsync(
          'INSERT INTO empresa (nome_fantasia, razao_social, cnpj, id_endereco) VALUES ($nome_fantasia, $razao_social, $cnpj, $id_endereco)',
          data,
        );
        return { ...empresa, id: result.lastInsertRowId };
      } else {
        const data = {
          $nome_completo: String(nome_completo),
          $data_de_nascimento: String(data_de_nascimento?.toLocaleDateString()),
          $cpf: String(cpf),
          $id_endereco: Number(id_endereco),
        };
        const result = await this.db.runAsync(
          'INSERT INTO empresa (nome_completo, data_de_nascimento, cpf, id_endereco) VALUES ($nome_completo, $data_de_nascimento, $cpf, $id_endereco)',
          data,
        );
        return { ...empresa, id: result.lastInsertRowId };
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, empresa: UpdateEmpresaDto) {
    try {
      const {
        id_endereco,
        cnpj,
        cpf,
        data_de_nascimento,
        nome_completo,
        nome_fantasia,
        razao_social,
      } = empresa;
      if (cpf) {
        const data = {
          $nome_completo: String(nome_completo),
          $data_de_nascimento: String(data_de_nascimento?.toLocaleDateString()),
          $cpf: String(cpf),
          $id_endereco: id_endereco,
        };

        const result = await this.db.runAsync(
          'UPDATE empresa SET nome_completo = $nome_completo, data_de_nascimento = $data_de_nascimento, cpf = $cpf, id_endereco = $id_endereco',
          data,
        );
        if (!result) {
          return { error: true };
        }
        return { ...empresa, id };
      } else {
        const data = {
          $nome_fantasia: String(nome_fantasia),
          $razao_social: String(razao_social),
          $cnpj: String(cnpj),
          $id_endereco: id_endereco,
        };
        const result = await this.db.runAsync(
          'UPDATE empresa SET nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj, id_endereco = $id_endereco',
          data,
        );
        if (!result) {
          return { error: true };
        }
        return { ...empresa, id };
      }
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM empresa');
      if (result.length === 0) {
        throw new Error('Não foi encontrado nenhum registro!');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findUniqueByCpf(cpf: string): Promise<any> {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM empresa WHERE cpf LIKE $cpf',
        { $cpf: `%${cpf}%` },
      );
      if (!result) {
        throw new Error('Nenhum registro foi encontrado');
      }
      return result;
    } catch (error) {
      console.error('o que deu errado: ', (error as Error).message);
      throw new Error((error as Error).message);
    }
  }

  async findAllByNomeCompleto(nome_completo: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM empresa WHERE nome_completo LIKE $nome_completo',
        { $nome_completo: `%${nome_completo}%` },
      );
      if (result.length === 0) {
        throw new Error('Não foram encontrados registros');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Erro ao buscar os registros tente novamente ' + String(error),
      );
    }
  }

  async findAllByNomeFantasia(nome_fantasia: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM empresa WHERE nome_fantasia LIKE $nome_fantasia',
        { $nome_fantasia: `%${nome_fantasia}%` },
      );
      if (result.length === 0) {
        throw new Error('Não foram encontrados registros');
      }
      return result;
    } catch (error) {
      console.error('o que deu errado: ', (error as Error).message);
      throw new Error((error as Error).message);
    }
  }

  async findAllByRazaoSocial(razao_social: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM empresa WHERE razao_social = $razao_social',
        { $razao_social: `%${razao_social}%` },
      );
      if (result.length === 0) {
        throw new Error('Nao foram encontrados nenhum registro!');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(
        'Erro ao buscar os registros tente novamente ' + String(error),
      );
    }
  }

  async findUniqueByCnpj(cnpj: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM empresa WHERE cnpj LIKE $cnpj',
        { $cnpj: `%${cnpj}%` },
      );
      if (!result) {
        throw new Error('Nao foi encontrado nenhum registro!');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE * FROM endereco WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error('');
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw new Error('');
    }
  }
}
