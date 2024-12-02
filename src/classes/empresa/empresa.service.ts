import { SQLiteDatabase } from 'expo-sqlite';
import {
  EmpresaCreate,
  TelefoneData,
  EmailData,
  RamoObject,
  EmpresaObject,
  SeachParamsEmpresa,
  TelefoneDataUpdate,
  EmailDataUpdate,
  RamoDataUpdate,
  EmpresaDataTableResult,
  EmpresaSearchRelatinalPessoa,
  EmpresaUpdate,
  Pessoa,
  EmpresaObjectSearch,
} from './types';
import { getDateFromString, getStringFromDate } from '@/utils';

export class EmpresaService {
  private db: SQLiteDatabase;

  constructor(dbInstance: SQLiteDatabase) {
    this.db = dbInstance;
  }

  async create(dados: EmpresaCreate) {
    try {
      const empresa = dados
      if (empresa.cnpj) {
        const empresaExistente = await this.db.getFirstAsync(
          'SELECT id FROM empresa WHERE cnpj = $cnpj',
          { $cnpj: empresa.cnpj },
        );
        if (empresaExistente)
          throw new Error('Empresa já cadastrada com este CNPJ!');
      }
      if (typeof empresa.pessoa.id === 'number' && empresa.pessoa.id !== 0) {
        const pessoa = await this.db.getFirstAsync(
          'SELECT * FROM pessoa WHERE id == $id',
          {
            $id: dados.pessoa.id,
          },
        );
        if (!pessoa) throw new Error('Pessoa não encontrada');
      } else {
        const res = await this.db.runAsync("INSERT into pessoa (nome, cpf, data_nascimento) VALUES ($nome, $cpf, $data_nascimento)", {
          $nome: empresa.pessoa.nome,
          $cpf: empresa.pessoa.cpf,
          $data_nascimento: getStringFromDate(empresa.pessoa.data_nascimento)
        })
        if (res.changes < 1) {
          throw new Error('Erro ao cadastrar pessoa')
        }
        empresa.pessoa.id = res.lastInsertRowId
      }
      if (typeof empresa.ramo.id === "number" && empresa.ramo.id !== 0) {
        const res = await this.db.getFirstAsync(
          'SELECT * from ramo  WHERE id == $id',
          {
            $id: empresa.ramo.id,
          },
        );
        if (!res) throw new Error('Ramo não encontrado');
      } else {
        const res = await this.db.runAsync("INSERT into ramo (nome) VALUES ($nome)",{
          $nome: empresa.ramo.nome
        })
        if (res.changes < 1) {
          throw new Error('Erro ao cadastrar ramo')
        }
        empresa.ramo.id = res.lastInsertRowId
      }
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
          $id_ramo: empresa.ramo.id,
          $id_pessoa: empresa.pessoa.id,
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

  async search(tipo: 'cpf' | 'cnpj' | 'nome_pessoa' | 'nome_fantasia' | 'razao_social', value: string ): Promise<EmpresaObjectSearch[]> {
    try {
      let query = 'SELECT e.razao_social, e.nome_fantasia, e.cnpj, e.id, p.cpf FROM empresa as e INNER JOIN pessoa as p ON p.id = e.id_pessoa';
      const params: SeachParamsEmpresa = {};

      switch (tipo) {
        case 'cnpj':
          query += ' WHERE e.cnpj LIKE $cnpj';
          params.$cnpj = `%${value}%`;
          break;
        case 'cpf':
          query += ' WHERE p.cpf LIKE $cpf';
          params.$cpf = `%${value}%`;
          break;
        
        case 'nome_fantasia':
          query += ` WHERE e.nome_fantasia LIKE $nome || ''`;
          params.$nome = `%${value}%`;
          break;
        
        case 'nome_pessoa':
          query += ` WHERE p.nome LIKE '%' || $nome || '%'`;
          params.$nome = value;
          break;

        case 'razao_social':
          query += ` WHERE emp.razao_social LIKE '%' || $razao_social || '%'`;
          params.$razao_social = value;
          break;

        default:
          throw new Error("Não foi possível ");
      }
      const dados = await this.db.getAllAsync<EmpresaObjectSearch>(query, params);
      if (dados.length < 1) {
        throw new Error("Não foi possível encontrar nenhuma empresa");
      }
      return dados;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const venda = await this.db.getAllAsync('SELECT * FROM compra WHERE id_empresa == $id', {
        $id: id,
      })
      if (venda.length > 0) {
        throw new Error('Não é possível deletar o cliente pois ele tem uma compra associada')
      }
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
    try {
      const empresas = await this.db.getAllAsync('SELECT * FROM empresa')
      if (empresas.length < 1) {
        const data = await this.db.getAllAsync<Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string }>('SELECT * FROM pessoa');
        if (data.length < 1) {
          throw new Error("Nenhuma pessoa encontrada");
        }
        return data.map((pss) => {
          return { ...pss, data_nascimento: getDateFromString(pss.data_nascimento) };
        });
      }
      const data = await this.db.getAllAsync<Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string }>('SELECT p.id, p.nome, p.cpf, p.data_nascimento FROM pessoa as p INNER JOIN empresa as e ON p.id != e.id_pessoa');
      if (data.length < 1) {
        throw new Error("Nenhuma pessoa encontrada");
      }
      return data.map((pss) => {
        return { ...pss, data_nascimento: getDateFromString(pss.data_nascimento) };
      });
    } catch (error) {
      throw error
    }
  }

  async getPessoaById(id: number): Promise<Pessoa> {
    try {
      const data = await this.db.getFirstAsync<Omit<Pessoa, 'data_nascimento'> & { data_nascimento: string }>('SELECT * FROM pessoa WHERE id == $id', {
        $id: id,
      });
      if (!data) {
        throw new Error("Não foi possível encontrar nenhuma pessoa!");
      }
      return { ...data, data_nascimento: getDateFromString(data.data_nascimento) };
    } catch (error) {
      throw error
    }
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

  async havePessoasComCpf(cpf: string) {
    const pessoas = await this.db.getAllAsync(
      'SELECT id, nome, data_nascimento, cpf FROM pessoa WHERE cpf == $cpf',
      { $cpf: cpf },
    );
    return pessoas.length < 1;
  }
  async haveCreatedEmail (email: string) {
    const emails = await this.db.getAllAsync(
      'SELECT * FROM email WHERE endereco == $email',
      { $email: email },
    );
    return emails.length < 1
  }

  async haveCreatedTelefone (telefone: string) {
    const telefones = await this.db.getAllAsync(
      'SELECT * FROM telefone WHERE numero == $telefone',
      { $telefone: telefone },
    );
    return telefones.length < 1
  }
}
