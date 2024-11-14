import {
  UnidadeDeArmazenamento,
  TipoDeUnidadeDeArmazenamento,
} from './interfaces';
import { SQLiteDatabase } from 'expo-sqlite';

export class UnidadesDeArmazenamento {
  constructor(private db: SQLiteDatabase) {}

  // Verifica se a unidade de armazenamento existe pelo ID
  async checkStorageUnitExists(id: number): Promise<boolean> {
    try {
      const unidade = await this.db.getFirstAsync(
        `SELECT id FROM ua WHERE id = $id`,
        { $id: id },
      );
      return !!unidade;
    } catch (error) {
      throw new Error(
        `Erro ao verificar existência da unidade de armazenamento: ${(error as Error).message}`,
      );
    }
  }

  // Verifica se o tipo de unidade de armazenamento existe pelo ID
  async checkStorageUnitTypeExists(id: number): Promise<boolean> {
    try {
      const tipo = await this.db.getFirstAsync(
        `SELECT id FROM tipo_de_ua WHERE id = $id`,
        { $id: id },
      );
      return !!tipo;
    } catch (error) {
      throw new Error(
        `Erro ao verificar existência do tipo de unidade de armazenamento: ${(error as Error).message}`,
      );
    }
  }

  // Busca todas as unidades de armazenamento
  async findAllStorageUnits(): Promise<UnidadeDeArmazenamento[]> {
    try {
      const unidades = await this.db.getAllAsync<UnidadeDeArmazenamento>(
        `SELECT id, nome, descricao, id_tipo_de_ua FROM ua`,
      );
      return unidades;
    } catch (error) {
      throw new Error(
        `Erro ao buscar todas as unidades de armazenamento: ${(error as Error).message}`,
      );
    }
  }

  // Busca unidades de armazenamento pelo nome
  async findStorageUnitsByName(
    nome: string,
  ): Promise<UnidadeDeArmazenamento[]> {
    try {
      const unidades = await this.db.getAllAsync<UnidadeDeArmazenamento>(
        `SELECT id, nome, descricao, id_tipo_de_ua 
         FROM ua
         WHERE nome LIKE $nome`,
        { $nome: `%${nome}%` },
      );
      return unidades;
    } catch (error) {
      throw new Error(
        `Erro ao buscar unidades de armazenamento pelo nome: ${(error as Error).message}`,
      );
    }
  }

  // Busca uma unidade de armazenamento pelo ID
  async findStorageUnitById(
    id: number,
  ): Promise<UnidadeDeArmazenamento | null> {
    try {
      const unidade = await this.db.getFirstAsync<UnidadeDeArmazenamento>(
        `SELECT id, nome, descricao, id_tipo_de_ua 
         FROM ua 
         WHERE id = $id`,
        { $id: id },
      );
      return unidade || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar unidade de armazenamento pelo ID: ${(error as Error).message}`,
      );
    }
  }

  // Busca todos os tipos de unidades de armazenamento
  async findAllStorageUnitTypes(): Promise<TipoDeUnidadeDeArmazenamento[]> {
    try {
      const tipos = await this.db.getAllAsync<TipoDeUnidadeDeArmazenamento>(
        `SELECT id, nome, descricao FROM tipo_de_ua`,
      );
      return tipos;
    } catch (error) {
      throw new Error(
        `Erro ao buscar tipos de unidades de armazenamento: ${(error as Error).message}`,
      );
    }
  }

  // Busca tipos de unidades de armazenamento pelo nome
  async findStorageUnitTypeByName(
    nome: string,
  ): Promise<TipoDeUnidadeDeArmazenamento[]> {
    try {
      const tipos = await this.db.getAllAsync<TipoDeUnidadeDeArmazenamento>(
        `SELECT id, nome, descricao 
         FROM tipo_de_ua
         WHERE nome LIKE $nome`,
        { $nome: `%${nome}%` },
      );
      return tipos;
    } catch (error) {
      throw new Error(
        `Erro ao buscar tipos de unidades de armazenamento pelo nome: ${(error as Error).message}`,
      );
    }
  }

  // Busca um tipo de unidade de armazenamento pelo ID
  async findStorageUnitTypeById(
    id: number,
  ): Promise<TipoDeUnidadeDeArmazenamento | null> {
    try {
      const tipo = await this.db.getFirstAsync<TipoDeUnidadeDeArmazenamento>(
        `SELECT id, nome, descricao 
         FROM tipo_de_ua 
         WHERE id = $id`,
        { $id: id },
      );
      return tipo || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar tipo de unidade de armazenamento pelo ID: ${(error as Error).message}`,
      );
    }
  }
}
