import * as SQLite from 'expo-sqlite';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import MessageErrors from 'messages-error';
import errors from 'messages-error';
import { EmpresaSearchCriteria } from './types';

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

    
  // Cadastro de empresa
  async create(dados: EmpresaCreateData) {
    try {
      // Verifica se o CNPJ/CPF já existe
      const empresaExistente = await this.db.getFirstAsync<EmpresaObject>(
        'SELECT id FROM empresa WHERE cnpj = $cnpj',
        { $cnpj: dados.cnpj }
      );

      if (empresaExistente) {
        throw new Error('Empresa já cadastrada com este CNPJ!');
      }

      // Inserção do ramo se aplicável
      let id_ramo: number | null = null;
      if (dados.ramo) {
        const ramoExistente = await this.db.getFirstAsync<RamoObject>(
          'SELECT id FROM ramo WHERE nome = $nome',
          { $nome: dados.ramo.nome }
        );

        if (ramoExistente) {
          id_ramo = ramoExistente.id;
        } else {
          const res_ramo = await this.db.runAsync(
            'INSERT INTO ramo (nome) VALUES ($nome)',
            { $nome: dados.ramo.nome }
          );
          id_ramo = res_ramo.lastInsertRowId;
        }
      }

      // Inserção da empresa
      const res_emp = await this.db.runAsync(
        'INSERT INTO empresa (nome, nome_fantasia, razao_social, cnpj, id_ramo) VALUES ($nome, $nome_fantasia, $razao_social, $cnpj, $id_ramo)',
        {
          $nome: dados.nome,
          $nome_fantasia: dados.nome_fantasia || null,
          $razao_social: dados.razao_social || null,
          $cnpj: dados.cnpj,
          $id_ramo: id_ramo || null,
        }
      );

      if (res_emp.changes < 1) {
        throw new Error('Não foi possível cadastrar a empresa!');
      }

      const id_empresa = res_emp.lastInsertRowId;

      // Vinculação de telefone, email, e endereço
      await this.vincularTelefones(id_empresa, dados.telefones);
      await this.vincularEmails(id_empresa, dados.emails);
      await this.vincularEndereco(id_empresa, dados.endereco);

    } catch (error) {
      throw error;
    }
  }

  // Atualização de empresa
  async update(id: number, dados: EmpresaUpdateData) {
    try {
      // Atualiza as informações básicas da empresa
      const res_emp = await this.db.runAsync(
        'UPDATE empresa SET nome = $nome, nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj WHERE id = $id',
        {
          $nome: dados.nome,
          $nome_fantasia: dados.nome_fantasia || null,
          $razao_social: dados.razao_social || null,
          $cnpj: dados.cnpj,
          $id: id,
        }
      );

      if (res_emp.changes < 1) {
        throw new Error('Empresa não encontrada ou não atualizada!');
      }

      // Atualiza o ramo
      if (dados.ramo) {
        const ramoExistente = await this.db.getFirstAsync<RamoObject>(
          'SELECT id FROM ramo WHERE nome = $nome',
          { $nome: dados.ramo.nome }
        );

        if (ramoExistente) {
          await this.db.runAsync(
            'UPDATE empresa SET id_ramo = $id_ramo WHERE id = $id',
            { $id_ramo: ramoExistente.id, $id: id }
          );
        } else {
          const res_ramo = await this.db.runAsync(
            'INSERT INTO ramo (nome) VALUES ($nome)',
            { $nome: dados.ramo.nome }
          );
          await this.db.runAsync(
            'UPDATE empresa SET id_ramo = $id_ramo WHERE id = $id',
            { $id_ramo: res_ramo.lastInsertRowId, $id: id }
          );
        }
      }

      // Atualiza telefones, emails, e endereço
      await this.vincularTelefones(id, dados.telefones);
      await this.vincularEmails(id, dados.emails);
      await this.vincularEndereco(id, dados.endereco);

    } catch (error) {
      throw error;
    }
  }

  // Buscar empresa por múltiplos critérios
  async search(criteria: EmpresaSearchCriteria) {
    try {

      let query = 'SELECT * FROM empresa WHERE 1=1';
      const params: any = {};

      if (criteria.cnpj) {
        query += ' AND cnpj = $cnpj';
        params.$cnpj = criteria.cnpj;
      }

      if (criteria.nome) {
        query += ' AND nome LIKE $nome';
        params.$nome = `%${criteria.nome}%`;
      }

      if (criteria.nome_fantasia) {
        query += ' AND nome_fantasia LIKE $nome_fantasia';
        params.$nome_fantasia = `%${criteria.nome_fantasia}%`;
      }

      if (criteria.razao_social) {
        query += ' AND razao_social LIKE $razao_social';
        params.$razao_social = `%${criteria.razao_social}%`;
      }

      return await this.db.getAllAsync(query, params);
    } catch (error) {
      throw error;
    }
  }

  // Excluir empresa
  async delete(id: number) {
    try {
      await this.db.runAsync('DELETE FROM empresa WHERE id = $id', { $id: id });
    } catch (error) {
      throw error;
    }
  }

  // Cadastro, atualização e exclusão de ramos
  async createRamo(nome: string) {
    try {
      const res = await this.db.runAsync('INSERT INTO ramo (nome) VALUES ($nome)', {
        $nome: nome,
      });
      return res.lastInsertRowId;
    } catch (error) {
      throw error;
    }
  }

  async updateRamo(id: number, nome: string) {
    try {
      await this.db.runAsync('UPDATE ramo SET nome = $nome WHERE id = $id', {
        $nome: nome,
        $id: id,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteRamo(id: number) {
    try {
      await this.db.runAsync('DELETE FROM ramo WHERE id = $id', { $id: id });
    } catch (error) {
      throw error;
    }
  }

  // Métodos auxiliares para vinculação de telefones, e-mails e endereços

  private async vincularTelefones(id_empresa: number, telefones: TelefoneData[]) {
    await Promise.all(
      telefones.map(async (telefone) => {
        const res_telefone = await this.db.runAsync(
          'INSERT INTO telefone (numero) VALUES ($numero)',
          { $numero: telefone.numero }
        );
        const id_telefone = res_telefone.lastInsertRowId;

        await this.db.runAsync(
          'INSERT INTO empresa_telefone (id_empresa, id_telefone) VALUES ($id_empresa, $id_telefone)',
          { $id_empresa: id_empresa, $id_telefone: id_telefone }
        );
      })
    );
  }

  private async vincularEmails(id_empresa: number, emails: EmailData[]) {
    await Promise.all(
      emails.map(async (email) => {
        const res_email = await this.db.runAsync(
          'INSERT INTO email (endereco) VALUES ($endereco)',
          { $endereco: email.endereco }
        );
        const id_email = res_email.lastInsertRowId;

        await this.db.runAsync(
          'INSERT INTO empresa_email (id_empresa, id_email) VALUES ($id_empresa, $id_email)',
          { $id_empresa: id_empresa, $id_email: id_email }
        );
      })
    );
  }

  private async vincularEndereco(id_empresa: number, endereco: EnderecoData) {
    const res_end = await this.db.runAsync(
      'INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES ($cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf)',
      {
        $cep: endereco.cep,
        $logradouro: endereco.logradouro,
        $numero: endereco.numero,
        $complemento: endereco.complemento || null,
        $bairro: endereco.bairro,
        $cidade: endereco.cidade,
        $uf: endereco.uf,
      }
    );

    const id_endereco = res_end.lastInsertRowId;
    await this.db.runAsync(
      'INSERT INTO empresa_endereco (id_empresa, id_endereco) VALUES ($id_empresa, $id_endereco)',
      { $id_empresa: id_empresa, $id_endereco: id_endereco }
    );
  }
  


  async getAllRamos(){

  }

  async get

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
