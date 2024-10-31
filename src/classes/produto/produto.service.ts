import { SQLiteDatabase } from 'expo-sqlite';
import { Produto, Marca, TipoProduto, UnidadeDeMedida } from './interfaces';

export class ProdutoService {
  constructor(private db: SQLiteDatabase) {}

  // CRUD de Produtos

  // Criação de Produto
  async createProduto(produto: Produto): Promise<number> {
    try {
      const result = await this.db.runAsync(
        `INSERT INTO produto (codigo_de_barras, data_de_validade, nome, descricao, valor, quantidade, id_marca, id_tipo_produto, id_unidade_de_medida, tamanho, id_unidade_de_armazenamento) 
         VALUES ($codigoDeBarras, $dataDeValidade, $nome, $descricao, $valor, $quantidade, $idMarca, $idTipoProduto, $idUnidadeDeMedida, $tamanho, $idUnidadeDeArmazenamento)`,
        {
          $codigoDeBarras: produto.codigoDeBarras,
          $dataDeValidade: produto.dataDeValidade,
          $nome: produto.nome,
          $descricao: String(produto.descricao),
          $valor: produto.valor,
          $quantidade: produto.quantidade,
          $idMarca: produto.idMarca,
          $idTipoProduto: produto.idTipoProduto,
          $idUnidadeDeMedida: produto.idUnidadeDeMedida,
          $tamanho: produto.tamanho,
          $idUnidadeDeArmazenamento: produto.idUnidadeDeArmazenamento,
        },
      );
      return result.lastInsertRowId;
    } catch (error) {
      throw new Error(`Erro ao criar produto: ${(error as Error).message}`);
    }
  }

  // Leitura de Produto
  async getProdutoById(id: number): Promise<Produto | null> {
    try {
      const produto = await this.db.getFirstAsync<Produto>(
        `SELECT * FROM produto WHERE id = $id`,
        { $id: id },
      );
      return produto || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar produto pelo ID: ${(error as Error).message}`,
      );
    }
  }

  // Leitura de Produto
  async getProdutoByCodigoDeBarras(
    codigoDeBarras: string,
  ): Promise<Produto | null> {
    try {
      const produto = await this.db.getFirstAsync<Produto>(
        `SELECT * FROM produto WHERE codigoDeBarras = $codigoDeBarras`,
        { $codigoDeBarras: codigoDeBarras },
      );
      return produto || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar produto pelo ID: ${(error as Error).message}`,
      );
    }
  }

  // Leitura de Produto
  async getAllProdutosByNome(
    nome: string,
    orderBy?: 'ASC' | 'DESC',
  ): Promise<Produto[]> {
    try {
      const $ord = orderBy ? orderBy : 'ASC';
      const produto = await this.db.getAllAsync<Produto>(
        `SELECT * FROM produto WHERE nome = $nome ORDER BY nome $ord`,
        { $nome: `%${nome}%`, $ord },
      );
      return produto;
    } catch (error) {
      throw new Error(
        `Erro ao buscar produto pelo ID: ${(error as Error).message}`,
      );
    }
  }

  // Leitura de Produto
  async getAllProdutos(orderBy?: 'ASC' | 'DESC'): Promise<Produto[]> {
    try {
      const $ord = orderBy ? orderBy : 'ASC';
      const produto = await this.db.getAllAsync<Produto>(
        `SELECT * FROM produto WHERE 1 = 1 ORDER BY nome $ord`,
        { $ord },
      );
      return produto;
    } catch (error) {
      throw new Error(
        `Erro ao buscar produtos: ${(error as Error).message}`,
      );
    }
  }

  // Atualização de Produto
  async updateProduto(id: number, produto: Produto): Promise<void> {
    try {
      await this.db.runAsync(
        `UPDATE produto 
         SET codigo_de_barras = $codigoDeBarras, data_de_validade = $dataDeValidade, nome = $nome, descricao = $descricao, valor = $valor, quantidade = $quantidade, id_marca = $idMarca, id_tipo_produto = $idTipoProduto, id_unidade_de_medida = $idUnidadeDeMedida, tamanho = $tamanho, id_unidade_de_armazenamento = $idUnidadeDeArmazenamento 
         WHERE id = $id`,
        {
          $codigoDeBarras: produto.codigoDeBarras,
          $dataDeValidade: produto.dataDeValidade,
          $nome: produto.nome,
          $descricao: String(produto.descricao),
          $valor: produto.valor,
          $quantidade: produto.quantidade,
          $idMarca: produto.idMarca,
          $idTipoProduto: produto.idTipoProduto,
          $idUnidadeDeMedida: produto.idUnidadeDeMedida,
          $tamanho: produto.tamanho,
          $idUnidadeDeArmazenamento: produto.idUnidadeDeArmazenamento,
          $id: id,
        },
      );
    } catch (error) {
      throw new Error(`Erro ao atualizar produto: ${(error as Error).message}`);
    }
  }

  // Exclusão de Produto
  async deleteProduto(id: number): Promise<void> {
    try {
      await this.db.runAsync(`DELETE FROM produto WHERE id = $id`, {
        $id: id,
      });
    } catch (error) {
      throw new Error(`Erro ao excluir produto: ${(error as Error).message}`);
    }
  }

  // CRUD de Marcas

  // Criação de Marca
  async createMarca(marca: Marca): Promise<number> {
    try {
      const result = await this.db.runAsync(
        `INSERT INTO marca (nome) VALUES ($nome)`,
        { $nome: marca.nome },
      );
      return result.lastInsertRowId;
    } catch (error) {
      throw new Error(`Erro ao criar marca: ${(error as Error).message}`);
    }
  }

  // Leitura de Marca
  async getMarcaById(id: number): Promise<Marca | null> {
    try {
      const marca = await this.db.getFirstAsync<Marca>(
        `SELECT * FROM marca WHERE id = $id`,
        { $id: id },
      );
      return marca || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar marca pelo ID: ${(error as Error).message}`,
      );
    }
  }

  // Leitura de Todas Marca
  async getAllMarca(orderBy?: 'ASC' | 'DESC'): Promise<Array<Marca>> {
    try {
      const $ord = orderBy ? orderBy : 'ASC';
      const marca = await this.db.getAllAsync<Marca>(
        `SELECT * FROM marca WHERE 1 = 1 ORDER BY $ord`,
        { $ord },
      );
      return marca;
    } catch (error) {
      throw new Error(`Erro ao buscar as marcas: ${(error as Error).message}`);
    }
  }

  // Atualização de Marca
  async updateMarca(id: number, marca: Marca): Promise<void> {
    try {
      await this.db.runAsync(`UPDATE marca SET nome = $nome WHERE id = $id`, {
        $nome: marca.nome,
        $id: id,
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar marca: ${(error as Error).message}`);
    }
  }

  // Exclusão de Marca
  async deleteMarca(id: number): Promise<void> {
    try {
      await this.db.runAsync(`DELETE FROM marca WHERE id = $id`, {
        $id: id,
      });
    } catch (error) {
      throw new Error(`Erro ao excluir marca: ${(error as Error).message}`);
    }
  }

  // CRUD de Tipos de Produto

  // Criação de Tipo de Produto
  async createTipoProduto(tipo: TipoProduto): Promise<number> {
    try {
      const result = await this.db.runAsync(
        `INSERT INTO tipo_produto (nome) VALUES ($nome)`,
        { $nome: tipo.nome },
      );
      return result.lastInsertRowId;
    } catch (error) {
      throw new Error(
        `Erro ao criar tipo de produto: ${(error as Error).message}`,
      );
    }
  }

  // Leitura de Tipo de Produto
  async getTipoProdutoById(id: number): Promise<TipoProduto | null> {
    try {
      const tipo = await this.db.getFirstAsync<TipoProduto>(
        `SELECT * FROM tipo_produto WHERE id = $id`,
        { $id: id },
      );
      return tipo || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar tipo de produto pelo ID: ${(error as Error).message}`,
      );
    }
  }

  // Atualização de Tipo de Produto
  async updateTipoProduto(id: number, tipo: TipoProduto): Promise<void> {
    try {
      await this.db.runAsync(
        `UPDATE tipo_produto SET nome = $nome WHERE id = $id`,
        { $nome: tipo.nome, $id: id },
      );
    } catch (error) {
      throw new Error(
        `Erro ao atualizar tipo de produto: ${(error as Error).message}`,
      );
    }
  }

  // Exclusão de Tipo de Produto
  async deleteTipoProduto(id: number): Promise<void> {
    try {
      await this.db.runAsync(`DELETE FROM tipo_produto WHERE id = $id`, {
        $id: id,
      });
    } catch (error) {
      throw new Error(
        `Erro ao excluir tipo de produto: ${(error as Error).message}`,
      );
    }
  }

  // CRUD de Unidades de Medida

  // Criação de Unidade de Medida
  async createUnidadeDeMedida(unidade: UnidadeDeMedida): Promise<number> {
    try {
      const result = await this.db.runAsync(
        `INSERT INTO unidade_de_medida (nome, valor, descricao) 
         VALUES ($nome, $valor, $descricao)`,
        {
          $nome: unidade.nome,
          $valor: unidade.valor,
          $descricao: String(unidade.descricao),
        },
      );
      return result.lastInsertRowId;
    } catch (error) {
      throw new Error(
        `Erro ao criar unidade de medida: ${(error as Error).message}`,
      );
    }
  }

  // Leitura de Unidade de Medida
  async getUnidadeDeMedidaById(id: number): Promise<UnidadeDeMedida | null> {
    try {
      const unidade = await this.db.getFirstAsync<UnidadeDeMedida>(
        `SELECT * FROM unidade_de_medida WHERE id = $id`,
        { $id: id },
      );
      return unidade || null;
    } catch (error) {
      throw new Error(
        `Erro ao buscar unidade de medida pelo ID: ${(error as Error).message}`,
      );
    }
  }

  // Atualização de Unidade de Medida
  async updateUnidadeDeMedida(
    id: number,
    unidade: UnidadeDeMedida,
  ): Promise<void> {
    try {
      await this.db.runAsync(
        `UPDATE unidade_de_medida SET nome = $nome, valor = $valor, descricao = $descricao WHERE id = $id`,
        {
          $nome: unidade.nome,
          $valor: unidade.valor,
          $descricao: String(unidade.descricao),
          $id: id,
        },
      );
    } catch (error) {
      throw new Error(
        `Erro ao atualizar unidade de medida: ${(error as Error).message}`,
      );
    }
  }

  // Exclusão de Unidade de Medida
  async deleteUnidadeDeMedida(id: number): Promise<void> {
    try {
      await this.db.runAsync(`DELETE FROM unidade_de_medida WHERE id = $id`, {
        $id: id,
      });
    } catch (error) {
      throw new Error(
        `Erro ao excluir unidade de medida: ${(error as Error).message}`,
      );
    }
  }
}
