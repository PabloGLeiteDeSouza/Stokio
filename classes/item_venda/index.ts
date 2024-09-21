import MessageErrors from 'messages-error';
import { CreateItemVendaDto } from './dto/create-item-venda.dto';
import { UpdateItemVendaDto } from './dto/update-item-venda.dto';
import * as SQLite from 'expo-sqlite';

export class ItemVenda {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(item_de_venda: CreateItemVendaDto) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO item_de_venda ( quantidade, valor, id_venda, id_produto ) VALUES ( $quantidade, $valor, $id_venda, $id_produto )',
        {
          $quantidade: item_de_venda.quantidade,
          $valor: item_de_venda.valor,
          $id_venda: item_de_venda.id_venda,
          $id_produto: item_de_venda.id_produto,
        },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsItemVenda.create.database,
        );
      }
      return { ...item_de_venda, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number, item_de_venda: UpdateItemVendaDto) {
    try {
      const result = await this.db.runAsync(
        'UPDATE item_de_venda SET quantidade = $quantidade, valor = $valor, id_venda = $id_venda, id_produto = $id_produto WHERE id = $id',
        {
          $id: id,
          $quantidade: item_de_venda.quantidade,
          $valor: item_de_venda.valor,
          $id_venda: item_de_venda.id_venda,
          $id_produto: item_de_venda.id_produto,
        },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsItemVenda.update.database,
        );
      }
      return { ...item_de_venda, id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstById(id: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM categoria WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsItemVenda.find.byId.database,
        );
      }
      return result as UpdateItemVendaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByName(nome: string) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM categoria WHERE nome LIKE $nome',
        { $nome: `%${nome}%` },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsItemVenda.find.all.database,
        );
      }
      return result as Array<UpdateItemVendaDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByIdProduto(nome: string) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM categoria WHERE nome = $nome',
        { $nome: nome },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsItemVenda.find.allByIdProduto.database,
        );
      }
      return result as UpdateItemVendaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM categoria');
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsTipoProduto.find.all.database,
        );
      }
      return result as Array<UpdateItemVendaDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete($id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE FROM categoria WHERE id = $id',
        {
          $id,
        },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsItemVenda.delete.database,
        );
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
