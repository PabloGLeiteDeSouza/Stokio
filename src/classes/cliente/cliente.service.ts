import { SQLiteDatabase } from 'expo-sqlite';
import {
  IClienteCreate,
  IClienteSimpleRequest,
  IClienteUpdate,
  IEmail,
  IEmailUpdate,
  IEndereco,
  IEnderecoUpdate,
  IPessoaUpdate,
  ISimpleCliente,
  ITelefone,
  ITelefoneUpdate,
} from './interfaces';

export class ClienteService {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(data: IClienteCreate): Promise<void> {
    try {
      const idPessoa = data.pessoa.id
        ? Number(data.pessoa.id)
        : await this.createOrFetchPessoa(data);
      const idEndereco = await this.createEndereco(data.endereco);
      const idCliente = await this.createCliente(
        data.limite,
        idEndereco,
        idPessoa,
      );
      await this.createEmails(data.emails, idCliente);
      await this.createTelefones(data.telefones, idCliente);
    } catch (error) {
      throw new Error(`Erro ao criar cliente: ${(error as Error).message}`);
    }
  }

  private async createOrFetchPessoa(data: IClienteCreate): Promise<number> {
    const pessoaExistente = await this.db.getFirstAsync<{ id: number }>(
      'SELECT id FROM pessoa WHERE cpf = $cpf',
      { $cpf: data.pessoa.cpf },
    );

    if (pessoaExistente) {
      return pessoaExistente.id;
    }

    const res = await this.db.runAsync(
      'INSERT INTO pessoa (nome, data_de_nascimento, cpf) VALUES ($nome, $data_de_nascimento, $cpf)',
      {
        $nome: data.pessoa.nome,
        $data_de_nascimento: data.pessoa.data_nascimento,
        $cpf: data.pessoa.cpf,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar a pessoa');
    }

    return res.lastInsertRowId;
  }

  private async createEndereco(endereco: IEndereco): Promise<number> {
    const res = await this.db.runAsync(
      'INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES ($cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf)',
      {
        $cep: endereco.cep,
        $logradouro: endereco.logradouro,
        $numero: endereco.numero,
        $complemento: endereco.complemento || '',
        $bairro: endereco.bairro,
        $cidade: endereco.cidade,
        $uf: endereco.uf,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível criar o endereço');
    }

    return res.lastInsertRowId;
  }

  private async createCliente(
    limite: string,
    idEndereco: number,
    id_pessoa: number,
  ): Promise<number> {
    const res = await this.db.runAsync(
      'INSERT INTO cliente (limite, id_endereco, id_pessoa) VALUES ($limite, $id_endereco, $id_pessoa)',
      {
        $limite: limite,
        $id_endereco: idEndereco,
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
          'INSERT INTO email (endereco) VALUES ($endereco)',
          { $endereco: email.endereco },
        );

        if (resEmail.changes < 1) {
          throw new Error('Não foi possível criar o e-mail');
        }

        const resClienteEmail = await this.db.runAsync(
          'INSERT INTO cliente_email (id_cliente, id_email) VALUES ($id_cliente, $id_email)',
          { $id_cliente: idCliente, $id_email: resEmail.lastInsertRowId },
        );

        if (resClienteEmail.changes < 1) {
          throw new Error('Não foi possível vincular o e-mail ao cliente');
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
          'INSERT INTO telefone (numero) VALUES ($numero)',
          { $numero: telefone.numero },
        );

        if (resTelefone.changes < 1) {
          throw new Error('Não foi possível criar o telefone');
        }

        const resClienteTelefone = await this.db.runAsync(
          'INSERT INTO cliente_telefone (id_cliente, id_telefone) VALUES ($id_cliente, $id_telefone)',
          { $id_cliente: idCliente, $id_telefone: resTelefone.lastInsertRowId },
        );

        if (resClienteTelefone.changes < 1) {
          throw new Error('Não foi possível vincular o telefone ao cliente');
        }
      }),
    );
  }

  async update(data: IClienteUpdate): Promise<void> {
    try {
      await this.updateCliente(data);
      await this.updatePessoa(data.pessoa);
      await this.updateEndereco(data.endereco);
      await this.updateEmails(data.emails);
      await this.updateTelefones(data.telefones);
    } catch (error) {
      throw new Error(`Erro ao atualizar cliente: ${(error as Error).message}`);
    }
  }

  private async updateCliente(data: IClienteUpdate): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE cliente SET limite = $limite, id_endereco = $id_endereco WHERE id = $id',
      {
        $id: data.id,
        $limite: data.limite,
        $id_endereco: data.endereco.id,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar o cliente');
    }
  }

  private async updatePessoa(data: IPessoaUpdate): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE pessoa SET nome = $nome, data_de_nascimento = $data_de_nascimento, cpf = $cpf WHERE id = $id',
      {
        $nome: data.nome,
        $data_de_nascimento: data.data_nascimento,
        $cpf: data.cpf,
        $id: data.id,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar a pessoa');
    }
  }

  private async updateEndereco(endereco: IEnderecoUpdate): Promise<void> {
    const res = await this.db.runAsync(
      'UPDATE endereco SET logradouro = $logradouro, numero = $numero, complemento = $complemento, bairro = $bairro, cidade = $cidade, uf = $uf WHERE id = $id',
      {
        $logradouro: endereco.logradouro,
        $numero: endereco.numero,
        $complemento: endereco.complemento || '',
        $bairro: endereco.bairro,
        $cidade: endereco.cidade,
        $uf: endereco.uf,
        $id: endereco.id,
      },
    );

    if (res.changes < 1) {
      throw new Error('Não foi possível atualizar o endereço');
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
        'DELETE FROM cliente_telefone WHERE id_cliente = $id',
        { $id: id },
      );
      await this.db.runAsync(
        'DELETE FROM cliente_email WHERE id_cliente = $id',
        { $id: id },
      );

      const enderecoResult = await this.db.getFirstAsync<{
        id_endereco: number;
      }>('SELECT id_endereco FROM cliente WHERE id = $id', { $id: id });

      await this.db.runAsync('DELETE FROM endereco WHERE id = $id_endereco', {
        $id_endereco: Number(enderecoResult?.id_endereco),
      });

      await this.db.runAsync(
        'DELETE FROM pessoa WHERE id = (SELECT id_pessoa FROM cliente WHERE id = $id)',
        { $id: id },
      );
      await this.db.runAsync('DELETE FROM cliente WHERE id = $id', { $id: id });
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
      return result;
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
      return result;
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
         WHERE pessoa.data_de_nascimento = $dataDeNascimento`,
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
        `SELECT cliente.*, pessoa.nome, pessoa.cpf, pessoa.data_de_nascimento
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

  async findClienteById(id: string) {
    try {
      const cliente = await this.db.getFirstAsync<ISimpleCliente>(
        `
        SELECT * FROM cliente WHERE id = $id`,
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
      const endereco = await this.db.getFirstAsync<IEndereco>(
        `SELECT * FROM endereco WHERE id = $id `,
        { $id: cliente.id_endereco },
      );
      if (!endereco) {
        throw new Error('Endereço do cliente não encontrado!');
      }
      const telefones = await this.db.getAllAsync<ITelefone>(
        `SELECT telefone.*
        WHERE telefone
        INNER JOIN cliente_telefone as ct ON ct.id_telefone == telefone.id
        INNER JOIN cliente ON cliente.id === ct.id_cliente
        WHERE cliente.id == $id`,
        { $id: cliente.id },
      );
      if (telefones.length < 1) {
        throw new Error('Nenhum telefone para o cliente foi encontrado!');
      }
      const emails = await this.db.getAllAsync<IEmail>(
        `
        SELECT email.*
        FROM email
        INNER JOIN cliente_email as ce ON ce.id_email == email.id
        INNER JOIN cliente ON cliente.id == ce.id_cliente
        WHERE cliente.id == $id`,
        { $id: cliente.id },
      );
      if (emails.length < 1) {
        throw new Error('Nenhum e-mail para o cliente foi encontrado!');
      }
      return {
        ...cliente,
        pessoa,
        endereco,
        telefones,
        emails,
      };
    } catch (error) {
      throw new Error(`Erro ao buscar o cliente: ${(error as Error).message}`);
    }
  }
}
