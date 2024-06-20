import * as SQLite from 'expo-sqlite';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

export class Produto {
  private db = SQLite.openDatabaseAsync('stock.db');

  async create(Produto: CreateProdutoDto) {
    const {
      nome,
      tipo,
      descricao,
      id_categoria,
      codigo_de_barras,
      id_empresa,
      preco,
      quantidade,
      id_marca,
      tamanho,
      data_de_validade,
    } = Produto;
    
    
    try {
        const db = await this.db;
        if (data_de_validade) {
            const data = {
                $nome: nome,
                $descricao: descricao,
                $tipo: tipo,
                $id_categoria: id_categoria,
                $codigo_de_barras: codigo_de_barras,
                $id_empresa: id_empresa,
                $preco: preco,
                $quantidade: quantidade,
                $id_marca: id_marca,
                $tamanho: tamanho,
                $data_de_validade: data_de_validade.toDateString(),
            };
            const result = await db.runAsync(
                'INSERT INTO produto (nome, descricao, tipo, id_categoria, codigo_de_barras, id_empresa, preco, quantidade, id_marca, tamanho, data_de_validade ) VALUES ( $nome, $descricao, $tipo, $id_categoria, $codigo_de_barras, $id_empresa, $preco, $quantidade, $id_marca, $tamanho, $data_de_validade )',
                data,
            );
            if (!result) {
                return { error: true };
            }
            return { id: result.lastInsertRowId, ...Produto };
        }
        const data = {
            $nome: nome,
            $descricao: descricao,
            $tipo: tipo,
            $id_categoria: id_categoria,
            $codigo_de_barras: codigo_de_barras,
            $id_empresa: id_empresa,
            $preco: preco,
            $quantidade: quantidade,
            $id_marca: id_marca,
            $tamanho: tamanho,
        };
        const result = await db.runAsync(
            'INSERT INTO produto (nome, descricao, tipo, id_categoria, codigo_de_barras, id_empresa, preco, quantidade, id_marca, tamanho ) VALUES ( $nome, $descricao, $tipo, $id_categoria, $codigo_de_barras, $id_empresa, $preco, $quantidade, $id_marca, $tamanho )',
            data,
        );
      
        if (!result) {
            return { error: true };
        }
        return { id: result.lastInsertRowId, ...Produto };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findAll() {
    try {
      const db = await this.db;
      const result = await db.getAllAsync(
        'SELECT * FROM produto',
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findFirstByIdMarca(id_marca: number){
    try {
      const db = await this.db;
      const result = await db.getFirstAsync('SELECT * FROM produto WHERE id_marca = $id_marca', { $id_marca: id_marca })
      return result;
    } catch (error) {
      console.error(error)
      return { error: true }
    }
  }

  async findFirstById(id: number) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM produto WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findFirstByName(nome: string) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM produto WHERE nome = $nome',
        { $nome: nome },
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findFirstByBarCode(codigo_de_barras: string) {
    try {
      const db = await this.db;
      const result = await db.getFirstAsync(
        'SELECT * FROM produto WHERE codigo_de_barras = $codigo_de_barras',
        { $codigo_de_barras: codigo_de_barras },
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findAllByTipo(tipo: string) {
    try {
      const db = await this.db;
      const result = await db.getAllAsync(
        'SELECT * FROM produto WHERE tipo = $tipo',
        { $tipo: tipo },
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async findAllByCategory(id_categoria: number) {
    try {
      const db = await this.db;
      const result = await db.getAllAsync(
        'SELECT * FROM produto WHERE id_categoria = $id_categoria',
        { $id_categoria: id_categoria },
      );
      if (!result) {
        return { error: true };
      }
      return result;
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async update(id: number, Produto: UpdateProdutoDto) {
    const { nome, descricao, tipo, id_categoria,codigo_de_barras, id_empresa, preco, quantidade, id_marca, tamanho, data_de_validade } = Produto;
    try {
      const db = await this.db;
      if (data_de_validade) {
        const data = {
          $id: id,
          $nome: nome,
          $descricao: descricao,
          $tipo: tipo,
          $id_categoria: id_categoria,
          $codigo_de_barras: codigo_de_barras,
          $id_empresa: id_empresa,
          $preco: preco,
          $quantidade: quantidade,
          $id_marca: id_marca,
          $tamanho: tamanho,
          $data_de_validade: data_de_validade.toDateString(),
        };
        const result = await db.runAsync(
          'UPDATE produto SET nome = $nome, descricao = $descricao, tipo = $tipo, id_categoria = $id_categoria, codigo_de_barras = $codigo_de_barras, id_empresa = $id_empresa, preco = $preco, quantidade = $quantidade, id_marca = $id_marca, tamanho = $tamanho, data_de_validade = $data_de_validade WHERE id = $id',
          data,
        );
        if (!result) {
          return { error: true };
        }
        return {...Produto, id};
      } else {
        const data = {
          $id: id,
          $nome: nome,
          $descricao: descricao,
          $tipo: tipo,
          $id_categoria: id_categoria,
          $codigo_de_barras: codigo_de_barras,
          $id_empresa: id_empresa,
          $preco: preco,
          $quantidade: quantidade,
          $id_marca: id_marca,
          $tamanho: tamanho,
        };
        const result = await db.runAsync(
          'UPDATE produto SET nome = $nome, descricao = $descricao, tipo = $tipo, id_categoria = $id_categoria, codigo_de_barras = $codigo_de_barras, id_empresa = $id_empresa, preco = $preco, quantidade = $quantidade, id_marca = $id_marca, tamanho = $tamanho WHERE id = $id',
          data,
        );
        if (!result) {
          return { error: true };
        }
        return {...Produto, id};
      }
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async delete(id: number) {
    try {
      const db = await this.db;
      const result = await db.runAsync(
        'DELETE * FROM produto WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        return { error: true };
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }
}
