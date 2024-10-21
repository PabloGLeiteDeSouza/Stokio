import { SQLiteDatabase } from 'expo-sqlite';
import {
  IClienteCreate,
  IClienteCreateOnly,
  IClienteSimpleRequest,
  IClienteUpdate,
  IClienteUpdateOnly,
  IEmail,
  IEmailUpdate,
  IPessoaCreate,
  IPessoaUpdate,
  ISimpleCliente,
  ITelefone,
  ITelefoneUpdate,
} from './interfaces';
import { getStringFromDate } from '@/utils';

export class ClienteService {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(data: IClienteCreate): Promise<void> {
    try {
      const { emails, telefones, pessoa, ...dados } = data;
      const idPessoa = data.pessoa.id
        ? Number(data.pessoa.id)
        : await this.createOrFetchPessoa(pessoa);
      const idCliente = await this.createCliente(dados, idPessoa);
      await this.createEmails(emails, idCliente);
      await this.createTelefones(telefones, idCliente);
    } catch (error) {
      throw new Error(`Erro ao criar cliente: ${(error as Error).message}`);
    }
  }

  private async createOrFetchPessoa(pessoa: IPessoaCreate): Promise<number> {
    const pessoaExistente = await this.db.getFirstAsync<{ id: number }>(
      'SELECT id FROM pessoa WHERE cpf = $cpf',
      { $cpf: pessoa.cpf },
    );

    if (pessoaExistente) {
      return pessoaExistente.id;
    }

    const res = await this.db.runAsync(
      'INSERT INTO pessoa (nome, data_nascimento, cpf) VALUES ($nome, $data_nascimento, $cpf)',
      {
        $nome: pessoa.nome,
        $data_nascimento: getStringFromDate(pessoa.data_nascimento),
        $cpf: pessoa.cpf,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar a pessoa');
    }

    return res.lastInsertRowId;
  }

  private async createCliente(
    cliente: IClienteCreateOnly,
    id_pessoa: number,
  ): Promise<number> {
    const res = await this.db.runAsync(
      'INSERT INTO cliente (limite, cep, logradouro, numero, complemento, bairro, cidade, uf, id_pessoa) VALUES ($limite, $cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf, $id_pessoa)',
      {
        $limite: cliente.limite,
        $cep: cliente.cep,
        $logradouro: cliente.logradouro,
        $numero: cliente.numero,
        $complemento: cliente.complemento || '',
        $bairro: cliente.bairro,
        $cidade: cliente.cidade,
        $uf: cliente.uf,
        $id_pessoa: id_pessoa,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar o cliente');
    }

    return res.lastInsertRowId;
  }

  private async createEmails(
    emails: IEmail[],
    idCliente: number,
  ): Promise<void> {
    await Promise.all(
      emails.map(async (email) => {
        const resEmail = await this.db.runAsync(
          'INSERT INTO email (endereco, id_cliente) VALUES ($endereco, $id_cliente)',
          { $endereco: email.endereco, $id_cliente: idCliente },
        );

        if (resEmail.changes < 1) {
          throw new Error('Não foi possível criar o e-mail');
        }
      }),
    );
  }

  private async createTelefones(
    telefones: ITelefone[],
    idCliente: number,
  ): Promise<void> {
    await Promise.all(
      telefones.map(async (telefone) => {
        const resTelefone = await this.db.runAsync(
          'INSERT INTO telefone ( numero, id_cliente ) VALUES ( $numero, $id_cliente )',
          { $numero: telefone.numero, $id_cliente: idCliente },
        );

        if (resTelefone.changes < 1) {
          throw new Error('Não foi possível criar o telefone');
        }
      }),
    );
  }

  async update(data: IClienteUpdate): Promise<void> {
    try {
      const { pessoa, emails, telefones, ...dados } = data;
      await this.updatePessoa(pessoa);
      await this.updateCliente(pessoa.id, dados);
      await this.updateEmails(emails);
      await this.updateTelefones(telefones);
    } catch (error) {
      throw new Error(`Erro ao atualizar cliente: ${(error as Error).message}`);
    }
  }

  private async updateCliente(
    id_pessoa: string,
    data: IClienteUpdateOnly,
  ): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE cliente SET limite = $limite, cep = $cep, logradouro = $logradouro, numero = $numero, complemento = $complemento, bairro = $bairro, cidade = $cidade, uf = $uf, id_pessoa = $id_pessoa WHERE id = $id',
      {
        $id: data.id,
        $limite: data.limite,
        $cep: data.cep,
        $logradouro: data.logradouro,
        $numero: data.numero,
        $complemento: data.complemento || '',
        $bairro: data.bairro,
        $cidade: data.cidade,
        $uf: data.uf,
        $id_pessoa: id_pessoa,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar o cliente');
    }
  }

  private async updatePessoa(data: IPessoaUpdate): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE pessoa SET nome = $nome, data_nascimento = $data_nascimento, cpf = $cpf WHERE id = $id',
      {
        $nome: data.nome,
        $data_nascimento: getStringFromDate(data.data_nascimento),
        $cpf: data.cpf,
        $id: data.id,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar a pessoa');
    }
  }

  private async updateEmails(emails: IEmailUpdate[]): Promise<void> {
    await Promise.all(
      emails.map(async (email) => {
        const res = await this.db.runAsync(
          'UPDATE email SET endereco = $endereco WHERE id = $id',
          { $endereco: email.endereco, $id: email.id },
        );

        if (res.changes < 1) {
          throw new Error('Não foi possível atualizar o e-mail');
        }
      }),
    );
  }

  private async updateTelefones(telefones: ITelefoneUpdate[]): Promise<void> {
    await Promise.all(
      telefones.map(async (telefone) => {
        const res = await this.db.runAsync(
          'UPDATE telefone SET numero = $numero WHERE id = $id',
          { $numero: telefone.numero, $id: telefone.id },
        );

        if (res.changes < 1) {
          throw new Error('Não foi possível atualizar o telefone');
        }
      }),
    );
  }

  // Método de deleção de cliente
  async deleteCliente(id: number): Promise<void> {
    try {
      await this.db.runAsync(
        'DELETE FROM pessoa WHERE id = (SELECT id_pessoa FROM cliente WHERE id = $id)',
        { $id: id },
      );
      await this.db.runAsync('DELETE FROM cliente WHERE id = $id', { $id: id });
      await this.db.runAsync('DELETE FROM telefone WHERE id_cliente = $id', {
        $id: id,
      });
      await this.db.runAsync('DELETE FROM email WHERE id_cliente = $id', {
        $id: id,
      });
    } catch (error) {
      throw new Error(`Erro ao deletar cliente: ${(error as Error).message}`);
    }
  }

  // Consultas personalizadas
  async findClienteByName(nome: string): Promise<IClienteSimpleRequest[]> {
    try {
      const result = await this.db.getAllAsync<IClienteSimpleRequest>(
        `SELECT * FROM cliente 
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id 
         WHERE pessoa.nome LIKE '%' || $nome || '%'`,
        { $nome: nome },
      );
      return result.map((item) => {
        return { ...item, data_nascimento: new Date(item.data_nascimento) };
      });
    } catch (error) {
      throw new Error(
        `Erro ao buscar cliente por nome: ${(error as Error).message}`,
      );
    }
  }

  async findAllClienteByCPF(cpf: string): Promise<IClienteSimpleRequest[]> {
    try {
      const result = await this.db.getAllAsync<IClienteSimpleRequest>(
        `SELECT * FROM cliente 
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id 
         WHERE pessoa.cpf LIKE '%' || $cpf || '%'`,
        { $cpf: cpf },
      );
      return result.map((item) => {
        return { ...item, data_nascimento: new Date(item.data_nascimento) };
      });
    } catch (error) {
      throw new Error(
        `Erro ao buscar cliente por CPF: ${(error as Error).message}`,
      );
    }
  }

  async findFirstClienteByCPF(cpf: string): Promise<IClienteSimpleRequest> {
    try {
      const result = await this.db.getFirstAsync<IClienteSimpleRequest>(
        `SELECT * FROM cliente 
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id 
         WHERE pessoa.cpf = $cpf`,
        { $cpf: cpf },
      );
      if (!result) {
        throw new Error('CPF não encontrado!');
      }
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar cliente por CPF: ${(error as Error).message}`,
      );
    }
  }

  async findClienteByDataNascimento(
    dataDeNascimento: string,
  ): Promise<IClienteSimpleRequest[]> {
    try {
      const result = await this.db.getAllAsync<IClienteSimpleRequest>(
        `SELECT * FROM cliente 
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id 
         WHERE pessoa.data_nascimento = $dataDeNascimento`,
        { $dataDeNascimento: dataDeNascimento },
      );
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar cliente por data de nascimento: ${(error as Error).message}`,
      );
    }
  }

  async findAllClientes(): Promise<IClienteSimpleRequest[]> {
    try {
      const result = await this.db.getAllAsync<IClienteSimpleRequest>(
        `SELECT cliente.*, pessoa.nome, pessoa.cpf, pessoa.data_nascimento as data_nascimento
         FROM cliente
         INNER JOIN pessoa ON cliente.id_pessoa = pessoa.id`,
      );
      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar todos os clientes: ${(error as Error).message}`,
      );
    }
  }

  async findClienteById(id: string): Promise<IClienteUpdate> {
    try {
      const cliente = await this.db.getFirstAsync<ISimpleCliente>(
        `SELECT * FROM cliente WHERE id = $id`,
        { $id: id },
      );
      if (!cliente) {
        throw new Error('Cliente não encontrado!');
      }

      const pessoa = await this.db.getFirstAsync<IPessoaUpdate>(
        `
        SELECT * FROM pessoa WHERE id == $id`,
        { $id: cliente.id_pessoa },
      );
      if (!pessoa) {
        throw new Error('Pessoa não encontrada!');
      }
      const telefones = await this.db.getAllAsync<ITelefoneUpdate>(
        `SELECT *
        FROM telefone
        WHERE id_cliente == $id`,
        { $id: cliente.id },
      );
      if (telefones.length < 1) {
        throw new Error('Nenhum telefone para o cliente foi encontrado!');
      }
      const emails = await this.db.getAllAsync<IEmailUpdate>(
        `
        SELECT *
        FROM email
        WHERE id_cliente == $id`,
        { $id: cliente.id },
      );
      if (emails.length < 1) {
        throw new Error('Nenhum e-mail para o cliente foi encontrado!');
      }
      return {
        ...cliente,
        pessoa: {
          ...pessoa,
          data_nascimento: new Date(pessoa.data_nascimento),
        },
        telefones,
        emails,
      };
    } catch (error) {
      throw new Error(`Erro ao buscar o cliente: ${(error as Error).message}`);
    }
  }

  async findAllPessoas(): Promise<IPessoaUpdate[]> {
    try {
      const data = await this.db.getAllAsync<IPessoaUpdate>(
        'SELECT * FROM pessoa INNER JOIN cliente ON cliente.id_pessoa != pessoa.id',
      );
      if (data.length < 1) {
        return data;
      }
      return data.map((item) => {
        return {
          ...item,
          data_nascimento: new Date(item.data_nascimento),
        };
      });
    } catch (error) {
      throw new Error('Erro ao buscar pessoas: ' + (error as Error).message);
    }
  }
}
