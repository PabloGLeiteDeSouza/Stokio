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
} from './types';
import { IEmpresaService } from './interfaces';

export class EmpresaService implements IEmpresaService {
  private db: SQLiteDatabase;

  constructor(dbInstance: SQLiteDatabase) {
    this.db = dbInstance;
  }

  async create(dados: EmpresaCreateData) {
    try {
      const empresaExistente = await this.db.getFirstAsync(
        'SELECT id FROM empresa WHERE cnpj = $cnpj',
        { $cnpj: dados.cnpj },
      );
      if (empresaExistente)
        throw new Error('Empresa já cadastrada com este CNPJ!');

      let id_ramo: number | null = null;
      if (dados.ramo) id_ramo = await this.getOrCreateRamo(dados.ramo.nome);

      const res_emp = await this.db.runAsync(
        'INSERT INTO empresa (nome, nome_fantasia, razao_social, cnpj, id_ramo) VALUES ($nome, $nome_fantasia, $razao_social, $cnpj, $id_ramo)',
        {
          $nome: dados.nome,
          $nome_fantasia: dados.nome_fantasia || null,
          $razao_social: dados.razao_social || null,
          $cnpj: dados.cnpj,
          $id_ramo: id_ramo,
        },
      );

      const id_empresa = res_emp.lastInsertRowId;
      await this.vincularTelefones(id_empresa, dados.telefones);
      await this.vincularEmails(id_empresa, dados.emails);
      await this.vincularEndereco(id_empresa, dados.endereco);
    } catch (error) {
      throw new Error(`Erro ao criar empresa: ${(error as Error).message}`);
    }
  }

  async update(id: number, dados: EmpresaUpdateData) {
    try {
      const res_emp = await this.db.runAsync(
        'UPDATE empresa SET nome = $nome, nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj, WHERE id = $id',
        {
          $nome: dados.nome,
          $nome_fantasia: dados.nome_fantasia || null,
          $razao_social: dados.razao_social || null,
          $cnpj: dados.cnpj,
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
      await this.vincularEndereco(id, dados.endereco);
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
        const res = await this.db.runAsync(
          'INSERT INTO telefone (numero) VALUES ($numero)',
          { $numero: telefone.numero },
        );
        const id_telefone = res.lastInsertRowId;
        await this.db.runAsync(
          'INSERT INTO empresa_telefone (id_empresa, id_telefone) VALUES ($id_empresa, $id_telefone)',
          { $id_empresa: id_empresa, $id_telefone: id_telefone },
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

  private async vincularEndereco(id_empresa: number, endereco: EnderecoData) {
    const res = await this.db.runAsync(
      'INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES ($cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf)',
      {
        $cep: endereco.cep,
        $logradouro: endereco.logradouro,
        $numero: endereco.numero,
        $complemento: endereco.complemento || null,
        $bairro: endereco.bairro,
        $cidade: endereco.cidade,
        $uf: endereco.uf,
      },
    );
    const id_endereco = res.lastInsertRowId;
    await this.db.runAsync(
      'INSERT INTO empresa_endereco (id_empresa, id_endereco) VALUES ($id_empresa, $id_endereco)',
      { $id_empresa: id_empresa, $id_endereco: id_endereco },
    );
  }
}
