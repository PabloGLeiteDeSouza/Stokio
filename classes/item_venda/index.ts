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

  async update(item_de_venda: UpdateItemVendaDto) {
    try {
      const result = await this.db.runAsync(
        'UPDATE item_de_venda SET quantidade = $quantidade, valor = $valor, id_venda = $id_venda, id_produto = $id_produto WHERE id = $id',
        {
          $id: item_de_venda.id,
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
      return { ...item_de_venda };
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

  async findAllByidVenda(id_venda: number) {
    try {
      const result = await this.db.getAllAsync(
        'SELECT * FROM item_de_venda WHERE id_venda = $id_venda',
        { $id_venda: id_venda },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsItemVenda.find.allByIdVenda.database,
        );
      }
      return result as Array<UpdateItemVendaDto>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByIdProduto(id_produto: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM item_de_venda WHERE id_produto = $id_produto',
        { $id_produto: id_produto },
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
      const result = await this.db.getAllAsync('SELECT * FROM item_de_venda');
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

  async delete($id: number) {
    try {
      const result = await this.db.runAsync(
        'DELETE FROM item_de_venda WHERE id = $id',
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
