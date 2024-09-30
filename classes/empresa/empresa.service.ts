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
import { SQLiteDatabase } from 'expo-sqlite';

export class EmpresaService implements IEmpresaService {
  private db: SQLiteDatabase; // Instância do banco de dados expo-sqlite

  constructor(dbInstance: SQLiteDatabase) {
    this.db = dbInstance;
  }

  // Cadastro de empresa
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
      throw error;
    }
  }

  // Atualização de empresa
  async update(id: number, dados: EmpresaUpdateData) {
    try {
      const res_emp = await this.db.runAsync(
        'UPDATE empresa SET nome = $nome, nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj WHERE id = $id',
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
      throw error;
    }
  }

  // Busca de empresas
  async search(criteria: EmpresaSearchCriteria): Promise<EmpresaObject[]> {
    let query = 'SELECT * FROM empresa WHERE 1=1';

    const params: SeachParamsEmpresa = {};

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
  }

  // Exclusão de empresa e todos os seus registros vinculados (exceto pessoa)
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
      throw error;
    }
  }

  // Buscar todos os ramos
  async getAllRamos(): Promise<RamoObject[]> {
    try {
      return await this.db.getAllAsync<RamoObject>('SELECT * FROM ramo');
    } catch (error) {
      throw error;
    }
  }

  // Criação de um ramo
  async createRamo(nome: string): Promise<number> {
    try {
      const res = await this.db.runAsync(
        'INSERT INTO ramo (nome) VALUES ($nome)',
        { $nome: nome },
      );
      return res.lastInsertRowId;
    } catch (error) {
      throw error;
    }
  }

  // Atualização de ramo
  async updateRamo(id: number, nome: string): Promise<void> {
    try {
      await this.db.runAsync('UPDATE ramo SET nome = $nome WHERE id = $id', {
        $nome: nome,
        $id: id,
      });
    } catch (error) {
      throw error;
    }
  }

  // Exclusão de ramo
  async deleteRamo(id: number): Promise<void> {
    try {
      await this.db.runAsync('DELETE FROM ramo WHERE id = $id', { $id: id });
    } catch (error) {
      throw error;
    }
  }

  // Métodos auxiliares
  private async getOrCreateRamo(nome: string): Promise<number> {
    const ramoExistente = await this.db.getFirstAsync<RamoObject>(
      'SELECT id FROM ramo WHERE nome = $nome',
      { $nome: nome },
    );
    if (ramoExistente) return ramoExistente.id;

    const res_ramo = await this.db.runAsync(
      'INSERT INTO ramo (nome) VALUES ($nome)',
      { $nome: nome },
    );
    return res_ramo.lastInsertRowId;
  }

  private async vincularTelefones(
    id_empresa: number,
    telefones: TelefoneData[],
  ) {
    await this.db.runAsync(
      'DELETE FROM empresa_telefone WHERE id_empresa = $id_empresa',
      { $id_empresa: id_empresa },
    );
    for (const telefone of telefones) {
      const res_tel = await this.db.runAsync(
        'INSERT INTO telefone (numero) VALUES ($numero)',
        { $numero: telefone.numero },
      );
      const id_telefone = res_tel.lastInsertRowId;
      await this.db.runAsync(
        'INSERT INTO empresa_telefone (id_empresa, id_telefone) VALUES ($id_empresa, $id_telefone)',
        { $id_empresa: id_empresa, $id_telefone: id_telefone },
      );
    }
  }

  private async vincularEmails(id_empresa: number, emails: EmailData[]) {
    await this.db.runAsync(
      'DELETE FROM empresa_email WHERE id_empresa = $id_empresa',
      { $id_empresa: id_empresa },
    );
    for (const email of emails) {
      const res_email = await this.db.runAsync(
        'INSERT INTO email (endereco) VALUES ($endereco)',
        { $endereco: email.endereco },
      );
      const id_email = res_email.lastInsertRowId;
      await this.db.runAsync(
        'INSERT INTO empresa_email (id_empresa, id_email) VALUES ($id_empresa, $id_email)',
        { $id_empresa: id_empresa, $id_email: id_email },
      );
    }
  }

  private async vincularEndereco(id_empresa: number, endereco: EnderecoData) {
    await this.db.runAsync(
      'DELETE FROM empresa_endereco WHERE id_empresa = $id_empresa',
      { $id_empresa: id_empresa },
    );
    const res_end = await this.db.runAsync(
      `INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, uf) 
       VALUES ($cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf)`,
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

    const id_endereco = res_end.lastInsertRowId;
    await this.db.runAsync(
      'INSERT INTO empresa_endereco (id_empresa, id_endereco) VALUES ($id_empresa, $id_endereco)',
      { $id_empresa: id_empresa, $id_endereco: id_endereco },
    );
  }
}
