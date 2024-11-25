import { SQLiteDatabase } from 'expo-sqlite';
import {
  EmpresaCreate,
  EmpresaSearchCriteria,
  TelefoneData,
  EmailData,
  RamoObject,
  EmpresaObject,
  SeachParamsEmpresa,
  TelefoneDataUpdate,
  EmailDataUpdate,
  EnderecoDataUpdate,
  RamoDataUpdate,
  EmpresaDataTableResult,
  EmpresaSearchRelatinalPessoa,
  EmpresaUpdate,
  Pessoa,
} from './types';
import { IEmpresaService } from './interfaces';
import { getDateFromString, getStringFromDate } from '@/utils';

export class EmpresaService implements IEmpresaService {
  private db: SQLiteDatabase;

  constructor(dbInstance: SQLiteDatabase) {
    this.db = dbInstance;
  }

  async create(dados: EmpresaCreate) {
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
        dados.pessoa.id !== 0
          ? dados.pessoa.id
          : (
              await this.db.runAsync(
                'INSERT into pessoa ( nome, data_nascimento, cpf ) VALUES ( $nome, $data_nascimento, $cpf )',
                {
                  $nome: String(dados.pessoa.nome),
                  $data_nascimento: getStringFromDate(
                    dados.pessoa.data_nascimento,
                  ),
                  $cpf: String(dados.pessoa.cpf),
                },
              )
            ).lastInsertRowId;

      const id_ramo =
        dados.ramo.id !== 0
          ? dados.ramo.id
          : (
              await this.db.runAsync(
                'INSERT into ramo ( nome ) VALUES ( $nome )',
                {
                  $nome: String(dados.ramo.nome),
                },
              )
            ).lastInsertRowId;

      const res_emp = await this.db.runAsync(
        'INSERT INTO empresa ( nome_fantasia, razao_social, cnpj, cep, logradouro, numero, complemento, bairro, cidade, uf, id_ramo, id_pessoa ) VALUES ( $nome_fantasia, $razao_social, $cnpj, $cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf, $id_ramo, $id_pessoa )',
        {
          $nome_fantasia: dados.nome_fantasia,
          $razao_social: dados.razao_social,
          $cnpj: dados.cnpj || '',
          $cep: dados.cep,
          $logradouro: dados.logradouro,
          $numero: dados.numero,
          $complemento: dados.complemento || '',
          $bairro: dados.bairro,
          $cidade: dados.cidade,
          $uf: dados.uf,
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

  async update(dados: EmpresaUpdate) {
    try {
      const res_emp = await this.db.runAsync(
        'UPDATE empresa SET nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj, cep = $cep, logradouro = $logradouro, numero = $numero, complemento = $complemento, bairro = $bairro, cidade = $cidade, uf = $uf WHERE id = $id',
        {
          $nome_fantasia: dados.nome_fantasia,
          $razao_social: dados.razao_social,
          $cnpj: dados.cnpj || null,
          $cep: dados.cep,
          $logradouro: dados.logradouro,
          $numero: dados.numero,
          $complemento: dados.complemento || null,
          $bairro: dados.bairro,
          $cidade: dados.cidade,
          $uf: dados.uf,
          $id: dados.id,
        },
      );

      if (res_emp.changes < 1)
        throw new Error('Empresa não encontrada ou não atualizada!');

      if (dados.ramo) {
        const id_ramo = await this.getOrCreateRamo(dados.ramo.nome);
        await this.db.runAsync(
          'UPDATE empresa SET id_ramo = $id_ramo WHERE id = $id',
          { $id_ramo: id_ramo, $id: dados.id },
        );
      }
      const res_pss = await this.db.runAsync(
        'UPDATE pessoa SET nome = $nome, cpf = $cpf, data_nascimento = $data_nascimento WHERE id = $id',
        {
          $nome: dados.pessoa.nome,
          $cpf: dados.pessoa.cpf,
          $data_nascimento: getStringFromDate(dados.pessoa.data_nascimento),
          $id: dados.pessoa.id,
        },
      );
      if (res_pss.changes < 1) {
        throw new Error('Pessoa não encontrada ou não atualizada!', {
          cause: 'ERR_PESSOA_UPDATE',
        });
      }
      await Promise.all(
        dados.telefones.map(async (tel) => {
          try {
            const res = await this.db.runAsync(
              'UPDATE telefone SET numero = $numero WHERE id = $id',
              {
                $numero: tel.numero,
                $id: tel.id,
              },
            );
            if (res.changes < 1) {
              throw new Error('Telefone não encontrado ou não atualizado!', {
                cause: 'ERR_TELEFONE_UPDATE',
              });
            }
          } catch (error) {
            throw error;
          }
        }),
      );
      await Promise.all(
        dados.emails.map(async (mail) => {
          try {
            const res = await this.db.runAsync(
              'UPDATE email SET endereco = $endereco WHERE id = $id',
              {
                $endereco: mail.endereco,
                $id: mail.id,
              },
            );
            if (res.changes < 1) {
              throw new Error('Email não encontrado ou não atualizado!', {
                cause: 'ERR_EMAIL_UPDATE',
              });
            }
          } catch (error) {
            throw error;
          }
        }),
      );
    } catch (error) {
      throw new Error(`Erro ao atualizar empresa: ${(error as Error).message}`);
    }
  }

  async findAll() {
    const data = this.db.getAllAsync("SELECT * FROM empresa");
    return data;
  }

  async findAllMin() {
    const data = await this.db.getAllAsync("SELECT e.id, e.nome_fantasia, e.razao_social, p.cpf, e.cnpj FROM empresa as e INNER JOIN pessoa as p ON p.id == e.id_pessoa");
    return data;
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
        'DELETE FROM telefone WHERE id_empresa = $id',
        { $id: id },
      );
      await this.db.runAsync(
        'DELETE FROM email WHERE id_empresa = $id',
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
          'INSERT INTO email (endereco, id_empresa) VALUES ($endereco, $id_empresa)',
          { $endereco: email.endereco, $id_empresa: id_empresa },
        );
      }),
    );
  }

  async getAllPessoas(): Promise<Pessoa[]> {
    const data = await this.db.getAllAsync<Pessoa>('SELECT * FROM pessoa');
    return data.map((pss) => {
      return { ...pss, data_nascimento: new Date(pss.data_nascimento) };
    });
  }

  async getAllEmpresas() {
    const data = await this.db.getAllAsync<EmpresaSearchRelatinalPessoa>(
      'SELECT emp.razao_social, emp.nome_fantasia, emp.cnpj, emp.id, pessoa.cpf FROM empresa as emp INNER JOIN pessoa ON pessoa.id == emp.id_pessoa',
    );
    return data;
  }

  async haveEmpresa() {
    const data = await this.db.getAllAsync('SELECT * FROM empresa');
    return data.length > 0;
  }

  async getById(id: number): Promise<EmpresaUpdate> {
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

      const pessoa = await this.db.getFirstAsync<Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string; }>(
        'SELECT * FROM pessoa WHERE id == $id',
        {
          $id: empresa.id_pessoa,
        },
      );
      if (!pessoa) throw new Error('Nao foi possivel encontrar a pessoa!');

      const telefones = await this.db.getAllAsync<TelefoneDataUpdate>(
        'SELECT id, numero FROM telefone WHERE id_empresa == $id',
        {
          $id: id,
        },
      );
      if (telefones.length < 1)
        throw new Error('Nao foi possivel encontrar nenhum telefone!');
      const emails = await this.db.getAllAsync<EmailDataUpdate>(
        'SELECT id, endereco FROM email WHERE id_empresa == $id',
        { $id: id },
      );
      if (emails.length < 1)
        throw new Error('Nao foi possivel encontrar nenhum email!');

      return {
        ...empresa,
        ramo,
        pessoa: {
          ...pessoa,
          data_nascimento: getDateFromString(pessoa.data_nascimento),
        },
        telefones,
        emails,
      };
    } catch (error) {
      throw error;
    }
  }

  async getEmpresaByIdToCompra(id: number) {
    try {
      const empresa = await this.db.getFirstAsync<{
        id: number;
        nome_fantasia: string;
        razao_social: string;
        cpf: string;
        cnpj: string | null;
      }>(
        'SELECT e.id, e.nome_fantasia, e.razao_social, e.cnpj, p.cpf FROM empresa as e INNER JOIN pessoa as p ON p.id == e.id_pessoa WHERE e.id == $id',
        { $id: id },
      );
      if (!empresa) throw new Error('Nao foi possivel encontrar a empresa!');
      return empresa
    } catch (error) {
      throw error;
    }
  }
}
