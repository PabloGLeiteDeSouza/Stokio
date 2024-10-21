import { SQLiteDatabase } from 'expo-sqlite';
import {
  EmpresaCreateData,
  EmpresaUpdateData,
  EmpresaSearchCriteria,
  TelefoneData,
  EmailData,
  EnderecoData,
  RamoObject,
  EmpresaObject,
  SeachParamsEmpresa,
  EmpresaSimpleData,
  EmpresaSimpleDataResult,
  PessoaDataResult,
  EnderecoDataResult,
  TelefoneObject,
  EmailObject,
  TelefoneDataUpdate,
  EmailDataUpdate,
  EnderecoDataUpdate,
  RamoDataUpdate,
  EmpresaDataTableResult,
} from './types';
import { IEmpresaService } from './interfaces';

export class EmpresaService implements IEmpresaService {
  private db: SQLiteDatabase;

  constructor(dbInstance: SQLiteDatabase) {
    this.db = dbInstance;
  }

  async create(dados: EmpresaCreateData) {
    try {
      if (dados.cnpj) {
        const empresaExistente = await this.db.getFirstAsync(
          'SELECT id FROM empresa WHERE cnpj = $cnpj',
          { $cnpj: dados.cnpj },
        );
        if (empresaExistente)
          throw new Error('Empresa já cadastrada com este CNPJ!');
      }
      if (dados.pessoa.id) {
        const pessoa = await this.db.getFirstAsync(
          'SELECT * FROM pessoa WHERE id == $id',
          {
            $id: dados.pessoa.id,
          },
        );
        if (!pessoa) throw new Error('Pessoa não encontrada');
      }
      if (dados.ramo.id) {
        const res = await this.db.getFirstAsync(
          'SELECT * from ramo  WHERE id == $id',
          {
            $id: dados.ramo.id,
          },
        );
        if (!res) throw new Error('Ramo não encontrado');
      }
      const id_pessoa =
        dados.pessoa.id !== '' && typeof dados.pessoa.id !== 'undefined'
          ? dados.pessoa.id
          : (
              await this.db.runAsync(
                'INSERT into pessoa ( nome, data_nascimento, cpf ) VALUES ( $nome, $data_nascimento, $cpf )',
                {
                  $nome: String(dados.pessoa.nome),
                  $data_nascimento: String(dados.pessoa.data_nascimento),
                  $cpf: String(dados.pessoa.cpf),
                },
              )
            ).lastInsertRowId.toString();

      const id_ramo =
        dados.ramo.id !== '' && typeof dados.ramo.id !== 'undefined'
          ? dados.ramo.id
          : (
              await this.db.runAsync(
                'INSERT into ramo ( nome ) VALUES ( $nome )',
                {
                  $nome: String(dados.ramo.nome),
                },
              )
            ).lastInsertRowId.toString();

      /* const id_endereco = (
        await this.db.runAsync(
          'INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES ($cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf)',
          {
            
          },
        )
      ).lastInsertRowId.toString(); */

      const res_emp = await this.db.runAsync(
        'INSERT INTO empresa ( nome, nome_fantasia, razao_social, cnpj, cep, logradouro, numero, complemento, bairro, cidade, uf, id_ramo, id_pessoa ) VALUES ( $nome, $nome_fantasia, $razao_social, $cnpj, $cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf, $id_ramo, $id_pessoa )',
        {
          $nome: dados.nome_fantasia,
          $nome_fantasia: dados.nome_fantasia,
          $razao_social: dados.razao_social,
          $cnpj: dados.cnpj || '',
          $cep: dados.endereco.cep,
          $logradouro: dados.endereco.logradouro,
          $numero: dados.endereco.numero,
          $complemento: dados.endereco.complemento || '',
          $bairro: dados.endereco.bairro,
          $cidade: dados.endereco.cidade,
          $uf: dados.endereco.uf,
          $id_ramo: id_ramo,
          $id_pessoa: id_pessoa,
        },
      );

      const id_empresa = res_emp.lastInsertRowId;
      await this.vincularTelefones(id_empresa, dados.telefones);
      await this.vincularEmails(id_empresa, dados.emails);
    } catch (error) {
      throw new Error(`Erro ao criar empresa: ${(error as Error).message}`);
    }
  }

  async update(id: number, dados: EmpresaUpdateData) {
    try {
      const res_emp = await this.db.runAsync(
        'UPDATE empresa SET nome = $nome, nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj, cep = $cep, logradouro = $logradouro, numero = $numero, complemento = $complemento, bairro = $bairro, cidade $cidade, uf = $uf, limite = $limite, id_ramo = $id_ramo WHERE id = $id',
        {
          $nome: dados.nome,
          $nome_fantasia: dados.nome_fantasia || null,
          $razao_social: dados.razao_social || null,
          $cnpj: dados.cnpj,
          $cep: dados.endereco.cep,
          $logradouro: dados.endereco.logradouro,
          $numero: dados.endereco.numero,
          $complemento: dados.endereco.complemento || null,
          $bairro: dados.endereco.bairro,
          $cidade: dados.endereco.cidade,
          $uf: dados.endereco.uf,
          $id: id,
        },
      );

      if (res_emp.changes < 1)
        throw new Error('Empresa não encontrada ou não atualizada!');

      if (dados.ramo) {
        const id_ramo = await this.getOrCreateRamo(dados.ramo.nome);
        await this.db.runAsync(
          'UPDATE empresa SET id_ramo = $id_ramo WHERE id = $id',
          { $id_ramo: id_ramo, $id: id },
        );
      }

      await this.vincularTelefones(id, dados.telefones);
      await this.vincularEmails(id, dados.emails);
    } catch (error) {
      throw new Error(`Erro ao atualizar empresa: ${(error as Error).message}`);
    }
  }

  async search(criteria: EmpresaSearchCriteria): Promise<EmpresaObject[]> {
    let query =
      'SELECT * FROM empresa INNER JOIN pessoa_empresa ON empresa.id = pessoa_empresa.id_empresa INNER JOIN pessoa ON pessoa_empresa.id_pessoa = pessoa.id WHERE 1=1';
    const params: SeachParamsEmpresa = {};

    if (criteria.cnpj) {
      query += ' AND empresa.cnpj = $cnpj';
      params.$cnpj = criteria.cnpj;
    }
    if (criteria.nome) {
      query += ' AND pessoa.nome LIKE $nome';
      params.$nome = `%${criteria.nome}%`;
    }
    if (criteria.cpf) {
      query += ' AND pessoa.cpf = $cpf';
      params.$cpf = criteria.cpf;
    }
    return await this.db.getAllAsync(query, params);
  }

  async delete(id: number) {
    try {
      await this.db.runAsync(
        'DELETE FROM empresa_telefone WHERE id_empresa = $id',
        { $id: id },
      );
      await this.db.runAsync(
        'DELETE FROM empresa_email WHERE id_empresa = $id',
        { $id: id },
      );
      await this.db.runAsync(
        'DELETE FROM empresa_endereco WHERE id_empresa = $id',
        { $id: id },
      );
      await this.db.runAsync('DELETE FROM empresa WHERE id = $id', { $id: id });
    } catch (error) {
      throw new Error(`Erro ao deletar empresa: ${(error as Error).message}`);
    }
  }

  private async getOrCreateRamo(nome: string): Promise<number> {
    const ramo = await this.db.getFirstAsync<RamoObject>(
      'SELECT id FROM ramo WHERE nome = $nome',
      { $nome: nome },
    );

    if (ramo) {
      return ramo.id;
    }

    const res = await this.db.runAsync(
      'INSERT INTO ramo (nome) VALUES ($nome)',
      { $nome: nome },
    );

    if (res.changes < 1) {
      throw new Error('Erro ao criar ramo');
    }

    return res.lastInsertRowId;
  }

  private async vincularTelefones(
    id_empresa: number,
    telefones: TelefoneData[],
  ) {
    await Promise.all(
      telefones.map(async (telefone) => {
        await this.db.runAsync(
          'INSERT INTO telefone (numero, id_empresa) VALUES ($numero, $id_empresa)',
          { $numero: telefone.numero, $id_empresa: id_empresa },
        );
      }),
    );
  }

  private async vincularEmails(id_empresa: number, emails: EmailData[]) {
    await Promise.all(
      emails.map(async (email) => {
        const res = await this.db.runAsync(
          'INSERT INTO email (endereco) VALUES ($endereco)',
          { $endereco: email.endereco },
        );
        const id_email = res.lastInsertRowId;
        await this.db.runAsync(
          'INSERT INTO empresa_email (id_empresa, id_email) VALUES ($id_empresa, $id_email)',
          { $id_empresa: id_empresa, $id_email: id_email },
        );
      }),
    );
  }

  async getAllPessoas() {
    const data = this.db.getAllAsync<{
      id: string;
      nome: string;
      cpf: string;
      data_nascimento: string;
    }>('SELECT * FROM pessoa');
    return data;
  }

  async getAllEmpresas() {
    const data = await this.db.getAllAsync<EmpresaSimpleData>(
      'SELECT emp.razao_social, emp.nome_fantasia, emp.cnpj, emp.id, pessoa.cpf FROM empresa as emp INNER JOIN pessoa ON pessoa.id == emp.id_pessoa',
    );
    return data;
  }

  async haveEmpresa() {
    const data = await this.db.getAllAsync('SELECT * FROM empresa');
    return data.length > 0;
  }

  async getById(id: string): Promise<EmpresaUpdateData> {
    try {
      const empresa = await this.db.getFirstAsync<EmpresaDataTableResult>(
        'SELECT * from empresa WHERE id == $id',
        { $id: id },
      );

      if (!empresa) throw new Error('Nao foi possivel encontrar a empresa!');

      const ramo = await this.db.getFirstAsync<RamoDataUpdate>(
        'SELECT * FROM ramo WHERE id == $id',
        {
          $id: empresa.id_ramo,
        },
      );

      if (!ramo) throw new Error('Não foi possível encontrar o ramo!');

      const pessoa = await this.db.getFirstAsync<PessoaDataResult>(
        'SELECT * FROM pessoa WHERE id == $id',
        {
          $id: empresa.id_pessoa,
        },
      );
      if (!pessoa) throw new Error('Nao foi possivel encontrar a pessoa!');

      const endereco = await this.db.getFirstAsync<EnderecoDataUpdate>(
        'SELECT * FROM endereco WHERE id == $id',
        {
          $id: empresa.id_endereco,
        },
      );

      if (!endereco) throw new Error('Nao foi possivel encontrar o endereco!');

      const telefones = await this.db.getAllAsync<TelefoneDataUpdate>(
        'SELECT tel.* FROM telefone as tel INNER JOIN empresa_telefone as et ON et.id_telefone == tel.id WHERE et.id_empresa == $id',
        {
          $id: id,
        },
      );
      if (telefones.length < 1)
        throw new Error('Nao foi possivel encontrar nenhum telefone!');
      const emails = await this.db.getAllAsync<EmailDataUpdate>(
        'SELECT mail.* FROM email as mail INNER JOIN empresa_email as ee ON mail.id == ee.id_email WHERE ee.id_empresa == $id',
        { $id: id },
      );
      if (emails.length < 1)
        throw new Error('Nao foi possivel encontrar nenhum email!');

      return {
        ...empresa,
        ramo,
        pessoa,
        endereco,
        telefones,
        emails,
      };
    } catch (error) {
      throw error;
    }
  }
}
