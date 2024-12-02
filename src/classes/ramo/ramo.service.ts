import { SQLiteDatabase } from 'expo-sqlite';
import { IRamoService } from './interfaces';
import { RamoCreateData, RamoUpdateData, RamoObject } from './types';

export class RamoService implements IRamoService {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  // Cria um novo ramo
  async create(data: RamoCreateData): Promise<number> {
    try {
      const existingRamo = await this.db.getFirstAsync<{ id: number }>(
        'SELECT id FROM ramo WHERE nome = $nome',
        { $nome: data.nome },
      );

      if (existingRamo) {
        throw new Error('Ramo já cadastrado!');
      }

      const result = await this.db.runAsync(
        'INSERT INTO ramo ( nome ) VALUES ( $nome )',
        {
          $nome: data.nome,
        },
      );
      if (result.changes < 1) {
        throw new Error('Nao foi possivel cadastrar!');
      }
      return result.lastInsertRowId;
    } catch (error) {
      throw new Error(`Erro ao criar ramo: ${(error as Error).message}`);
    }
  }

  // Atualiza um ramo existente
  async update(data: RamoUpdateData): Promise<void> {
    try {
      const result = await this.db.runAsync(
        'UPDATE ramo SET nome = $nome WHERE id = $id',
        {
          $id: data.id,
          $nome: data.nome,
        },
      );

      if (result.changes < 1) {
        throw new Error('Ramo não encontrado ou não atualizado!');
      }
    } catch (error) {
      throw new Error(`Erro ao atualizar ramo: ${(error as Error).message}`);
    }
  }

  // Busca um ramo por ID
  async findById(id: number): Promise<RamoObject | null> {
    try {
      const ramo = await this.db.getFirstAsync<RamoObject>(
        'SELECT * FROM ramo WHERE id = $id',
        { $id: id },
      );

      return ramo || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar ramo por ID: ${(error as Error).message}`,
      );
    }
  }

  // Busca ramos por nome parcial
  async findByName(nome: string): Promise<RamoObject[]> {
    try {
      const ramos = await this.db.getAllAsync<RamoObject>(
        `SELECT * FROM ramo WHERE nome LIKE '%' || $nome || '%'`,
        { $nome: nome },
      );
      if(ramos.length < 1){
        throw new Error("Não foi possível encontrar nenhum ramo!");
      }
      return ramos;
    } catch (error) {
      throw error;
    }
  }
  // Busca todos os ramos
  async findAll(): Promise<RamoObject[]> {
    try {
      const ramos = await this.db.getAllAsync<RamoObject>('SELECT * FROM ramo');
      if (ramos.length < 1) {
        throw new Error("Não foi possível encontrar nenhum ramo!");
      }
      return ramos;
    } catch (error) {
      throw error;
    }
  }

  // Exclui um ramo
  async delete(id: number): Promise<void> {
    try {
      const dados = await this.db.getAllAsync('SELECT * FROM produto WHERE id_ramo == $id', {
        $id: id,
      })
      if (dados.length > 0) {
        throw new Error('Não é possível excluir o ramo pois ele tem produtos associados', {
          cause: 'ERR_RAMO_DELETE_ASSOCIATED_PRODUCTS',
        });
      }
      await this.db.runAsync('DELETE FROM ramo WHERE id = $id', { $id: id });
    } catch (error) {
      throw new Error(`Erro ao excluir ramo: ${(error as Error).message}`);
    }
  }

  async haveRamos() {
    const data = await this.db.getAllAsync('SELECT * FROM ramo');
    return data.length > 0;
  }
}
