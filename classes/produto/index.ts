import * as SQLite from 'expo-sqlite';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import errors from 'messages-error';

export class Produto {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

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
        const result = await this.db.runAsync(
          'INSERT INTO produto (nome, descricao, tipo, id_categoria, codigo_de_barras, id_empresa, preco, quantidade, id_marca, tamanho, data_de_validade ) VALUES ( $nome, $descricao, $tipo, $id_categoria, $codigo_de_barras, $id_empresa, $preco, $quantidade, $id_marca, $tamanho, $data_de_validade )',
          data,
        );
        if (!result) {
          throw new Error(errors.database_errors.ErrorsProduto.create.database);
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
      const result = await this.db.runAsync(
        'INSERT INTO produto (nome, descricao, tipo, id_categoria, codigo_de_barras, id_empresa, preco, quantidade, id_marca, tamanho ) VALUES ( $nome, $descricao, $tipo, $id_categoria, $codigo_de_barras, $id_empresa, $preco, $quantidade, $id_marca, $tamanho )',
        data,
      );

      if (!result) {
        throw new Error(errors.database_errors.ErrorsProduto.create.database);
      }
      return { id: result.lastInsertRowId, ...Produto };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM produto');
      if (!result) {
        throw new Error(errors.database_errors.ErrorsEmpresa.find.all.database);
      }
      return result as Array<UpdateProdutoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstByIdMarca(id_marca: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM produto WHERE id_marca = $id_marca',
        { $id_marca: id_marca },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsProduto.find.allbyIdMarca.database,
        );
      }
      return result as Array<UpdateProdutoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstById(id: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM produto WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsProduto.find.allbyIdMarca.database,
        );
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstByName(nome: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM produto WHERE nome = $nome',
        { $nome: nome },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsProduto.find.byNome.database,
        );
      }
      return result as UpdateProdutoDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstByBarCode(codigo_de_barras: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM produto WHERE codigo_de_barras = $codigo_de_barras',
        { $codigo_de_barras: codigo_de_barras },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsProduto.find.byCodigoDeBarras.database,
        );
      }
      return result as UpdateProdutoDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByTipo(tipo: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM produto WHERE tipo = $tipo',
        { $tipo: tipo },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsProduto.find.byTipo.database,
        );
      }
      return result as Array<UpdateProdutoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByIdEmpresa($id_empresa: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM produto WHERE id_empresa = $id_empresa',
        { $id_empresa },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsProduto.find.allbyIdEmpresa.database,
        );
      }
      return result as Array<UpdateProdutoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByCategory(id_categoria: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM produto WHERE id_categoria = $id_categoria',
        { $id_categoria: id_categoria },
      );
      if (!result) {
        throw new Error(
          errors.database_errors.ErrorsProduto.find.allbyIdCategoria.database,
        );
      }
      return result as Array<UpdateProdutoDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, Produto: UpdateProdutoDto) {
    const {
      nome,
      descricao,
      tipo,
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
        const result = await this.db.runAsync(
          'UPDATE produto SET nome = $nome, descricao = $descricao, tipo = $tipo, id_categoria = $id_categoria, codigo_de_barras = $codigo_de_barras, id_empresa = $id_empresa, preco = $preco, quantidade = $quantidade, id_marca = $id_marca, tamanho = $tamanho, data_de_validade = $data_de_validade WHERE id = $id',
          data,
        );
        if (!result) {
          throw new Error(errors.database_errors.ErrorsProduto.update.database);
        }
        return { ...Produto, id };
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
        const result = await this.db.runAsync(
          'UPDATE produto SET nome = $nome, descricao = $descricao, tipo = $tipo, id_categoria = $id_categoria, codigo_de_barras = $codigo_de_barras, id_empresa = $id_empresa, preco = $preco, quantidade = $quantidade, id_marca = $id_marca, tamanho = $tamanho WHERE id = $id',
          data,
        );
        if (!result) {
          throw new Error(errors.database_errors.ErrorsProduto.update.database);
        }
        return { ...Produto, id };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE * FROM produto WHERE id = $id',
        {
          $id: id,
        },
      );
      if (!result) {
        if (!result) {
          throw new Error(errors.database_errors.ErrorsProduto.delete.database);
        }
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
