import MessageErrors from 'messages-error';
import * as SQLite from 'expo-sqlite';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';

export class Venda {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async create(venda: CreateVendaDto) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO venda (valor, data, id_cliente) VALUES ($valor, $data, $id_cliente)',
        {
          $valor: venda.valor.toString(),
          $data: venda.data.toLocaleDateString(),
          $id_cliente: venda.id_cliente.toString(),
        },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsVenda.create.database,
        );
      }
      return { ...venda, id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(venda: UpdateVendaDto) {
    try {
      const result = await this.db.runAsync(
        'UPDATE venda SET valor = $valor, data = $data, id_cliente = $id_cliente WHERE id = $id',
        {
          $id: venda.id.toString(),
          $valor: venda.valor.toString(),
          $data: venda.data.toLocaleDateString(),
          $id_cliente: venda.id_cliente.toString(),
        },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsVenda.update.database,
        );
      }
      return { ...venda };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findFirstById(id: number) {
    try {
      const result = await this.db.getFirstAsync(
        'SELECT * FROM venda WHERE id = $id',
        { $id: id },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsVenda.find.byId.database,
        );
      }
      return result as UpdateVendaDto;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByIdCliente(id_cliente: number, order?: 'ASC' | 'DESC') {
    try {
      const ord = order ? order : 'ASC';
      const result = await this.db.getAllAsync(
        'SELECT * FROM venda WHERE id_cliente = $id_cliente ORDER BY id_cliente $ord',
        { $id_cliente: id_cliente.toString(), $ord: ord },
      );
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsVenda.find.all.database,
        );
      }
      return result as UpdateVendaDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.db.getAllAsync('SELECT * FROM venda');
      if (!result) {
        throw new Error(
          MessageErrors.database_errors.ErrorsVenda.find.all.database,
        );
      }
      return result as Array<UpdateVendaDto>;
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
          MessageErrors.database_errors.ErrorsVenda.delete.database,
        );
      }
      return { sucess: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
