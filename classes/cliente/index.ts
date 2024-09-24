import { SQLiteDatabase } from 'expo-sqlite';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import errors from 'messages-error';

export class Cliente {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create(cliente: CreateClienteDto) {
    try {
      const data = await this.db.runAsync(
        'INSERT into cliente ( id_pessoa, limite, status ) VALUES ( $id_pessoa, $limite, $status )',
        {
          $id_pessoa: String(cliente.id_pessoa),
          $limite: String(cliente.limite),
          $status: String(Number(cliente.status)),
        },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsCliente.update.database);
      }
      return { ...cliente, id: data.lastInsertRowId };
    } catch (error) {
      throw error;
    }
  }

  async update(cliente: UpdateClienteDto) {
    try {
      const data = await this.db.runAsync(
        'UPDATE Cliente SET id_pessoa = $id_pessoa, limite = $limite, status = $status WHERE id = $id',
        {
          $id: String(cliente.id),
          $id_pessoa: String(cliente.id_pessoa),
          $limite: String(cliente.limite),
          $status: String(Number(cliente.status)),
        },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsCliente.update.database);
      }
      return { ...cliente };
    } catch (error) {
      throw error;
    }
  }

  async findUnique() {}

  async findAll() {
    try {
      const data = await this.db.getAllAsync('SELECT * FROM Cliente');
      if (!data) {
        throw new Error(errors.database_errors.ErrorsCliente.find.all.database);
      }
      return data as Array<UpdateClienteDto>;
    } catch (error) {
      throw error;
    }
  }

  async findByIdPessoa($id_pessoa: number) {
    try {
      const data = await this.db.getFirstAsync(
        'SELECT * FROM Cliente WHERE id_pessoa = $id_pessoa',
        { $id_pessoa },
      );
      if (!data) {
        throw new Error(
          errors.database_errors.ErrorsCliente.find.byIdPessoa.database,
        );
      }
      return data as UpdateClienteDto;
    } catch (error) {
      throw error;
    }
  }

  async delete($id: number) {
    try {
      const data = await this.db.runAsync(
        'DELETE FROM Cliente WHERE id = $id',
        { $id },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsCliente.delete.database);
      }
      return { status: true };
    } catch (error) {
      throw error;
    }
  }

  async disable($id: number) {
    try {
      const data = await this.db.runAsync(
        'UPDATE Cliente SET status = 0 WHERE id = $id',
        { $id },
      );
      if (!data) {
        throw new Error(errors.database_errors.ErrorsCliente.disable.database);
      }
      return { status: true };
    } catch (error) {
      throw error;
    }
  }
}
