import { Ua } from '@/types/screens/ua';
import {
  UnidadeDeArmazenamento,
  TipoDeUnidadeDeArmazenamento,
  UnidadeDeArmazenamentoCreate,
  UnidadeDeArmazenamentoObject,
  UnidadeDeArmazenamentoUpdate,
  UnidadeDeArmazenamentoListView,
} from './interfaces';
import { SQLiteDatabase } from 'expo-sqlite';

export default class UaService {
  constructor(private db: SQLiteDatabase) {}

  // Verifica se a unidade de armazenamento existe pelo ID
  async checkStorageUnitExists(id: number): Promise<boolean> {
    try {
      const unidade = await this.db.getFirstAsync(
        `SELECT id FROM unidade_de_armazenamento WHERE id = $id`,
        { $id: id },
      );
      return !!unidade;
    } catch (error) {
      throw new Error(
        `Erro ao verificar existência da unidade de armazenamento: ${(error as Error).message}`,
      );
    }
  }

  async create(data: UnidadeDeArmazenamentoCreate): Promise<void> {
    try {
      if (data.tipo_ua.id === 0) {
        const tipoRes = await this.db.runAsync(
          'INSERT INTO tipo_ua (nome, descricao) VALUES ($nome, $descricao)',
          { $nome: data.tipo_ua.nome, $descricao: String(data.tipo_ua.descricao)},
        );
        data.tipo_ua.id = tipoRes.lastInsertRowId;
      }

      await this.db.runAsync(
        'INSERT INTO ua (nome, descricao, id_tipo_ua) VALUES ($nome, $descricao, $id_tipo_ua)',
        {
          $nome: data.nome,
          $descricao: String(data.descricao),
          $id_tipo_ua: data.tipo_ua.id,
        },
      );

    } catch (err) {
      throw new Error(`Erro ao criar unidade de armazenamento: ${(err as Error).message}`);
    }
  }

  async update(data: UnidadeDeArmazenamentoUpdate): Promise<void> {
    try {
      await this.db.runAsync(
        'UPDATE ua SET nome = $nome, descricao = $descrocao, id_tipo_ua = $id_tipo_ua WHERE id = $id',
        {
          $id: data.id,
          $nome: data.nome,
          $descricao: String(data.descricao),
          $id_tipo_ua: data.tipo_ua.id,
        },
      );
      await this.db.runAsync(
        'UPDATE tipo_ua SET nome = $nome, descricao = $descricao WHERE id = $id',
        { $nome: data.tipo_ua.nome, $descricao: String(data.tipo_ua.descricao), $id: data.tipo_ua.id },
      );
    } catch (err) {
      throw new Error(`Erro ao criar unidade de armazenamento: ${(err as Error).message}`);
    }
  }

  // Verifica se o tipo de unidade de armazenamento existe pelo ID
  async checkStorageUnitTypeExists(id: number): Promise<boolean> {
    try {
      const tipo = await this.db.getFirstAsync(
        `SELECT id FROM tipo_ua WHERE id = $id`,
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
        `SELECT id, nome, descricao, id_tipo_de_unidade_de_armazenamento FROM unidade_de_armazenamento`,
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
        `SELECT id, nome, descricao, id_tipo_de_unidade_de_armazenamento 
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
  ): Promise<UnidadeDeArmazenamentoObject> {
    try {
      const unidade = await this.db.getFirstAsync<UnidadeDeArmazenamento>(
        `SELECT id, nome, descricao, id_tipo_ua
         FROM ua 
         WHERE id = $id`,
        { $id: id },
      );
      if (!unidade) {
        throw new Error("Nao foi possivel encontrar a unidade de armazenamento!");
      }
      const { id_tipo_ua, ...ua} = unidade;
      const tipo_ua = await this.db.getFirstAsync<TipoDeUnidadeDeArmazenamento>('SELECT * FROM tipo_ua WHERE id = $id', {
        $id: id_tipo_ua,
      })
      if (!tipo_ua) {
        throw new Error("Nao foi possivel encontrar o tipo de unidade de armazenamento!")
      }
      return {...ua, tipo_ua };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const data = await this.db.getAllAsync<Ua>('SELECT ua.id, ua.nome, tipo_ua.nome as tipo FROM ua INNER JOIN tipo_ua ON ua.id_tipo_ua == tipo_ua.id');
    return data;
  }

  // Busca todos os tipos de unidades de armazenamento
  async findAllStorageUnitTypes(): Promise<TipoDeUnidadeDeArmazenamento[]> {
    try {
      const tipos = await this.db.getAllAsync<TipoDeUnidadeDeArmazenamento>(
        `SELECT id, nome, descricao FROM tipo_de_unidade_de_armazenamento`,
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
         FROM tipo_de_unidade_de_armazenamento
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
         FROM tipo_de_unidade_de_armazenamento 
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

  async findUaByTipo(id: number): Promise<UnidadeDeArmazenamentoListView[]> {
    try {
      const data = await this.db.getAllAsync<UnidadeDeArmazenamentoListView>('SELECT ua.id, ua.nome, tipo_ua.nome as tipo FROM ua INNER JOIN tipo_ua ON tipo_ua.id == ua.id_tipo_ua WHERE id_tipo_ua = $id', {
        $id: id
      });

      if(data.length < 1){
        throw new Error("Nao foram encontradas Unidades de Armazenamento com esse Tipo!");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findUaByNome(nome: string): Promise<UnidadeDeArmazenamentoListView[]> {
    try {
      const data = await this.db.getAllAsync<UnidadeDeArmazenamentoListView>(`SELECT ua.id, ua.nome, tipo_ua.nome as tipo FROM ua INNER JOIN tipo_ua ON tipo_ua.id == ua.id_tipo_ua WHERE ua.nome LIKE $nome`, {
        $nome: `%${nome}%`,
      });

      if(data.length < 1){
        throw new Error("Nao foram encontradas Unidades de Armazenamento com esse nome!");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async haveUas() {
    const data = await this.db.getAllAsync(
      'SELECT * FROM unidade_de_armazenamento',
    );
    return data.length > 0;
  }

  async delete(id: number) {
    try {
      const res = await this.db.runAsync('DELETE FROM ua WHERE id = $id', { $id: id });
      if (res.changes < 1) {
        throw new Error("Não foi possível deletar a unidade de armazenamento");
      }
    } catch (error) {
      throw error;
    }
  }
}
