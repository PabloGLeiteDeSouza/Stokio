import { SQLiteDatabase } from 'expo-sqlite';

export default class VendaService {
  constructor(private db: SQLiteDatabase) {}

  async create(data) {
    try {
      await this.db.runAsync('INSERT into venda ( data, status, id_cliente ) VALUES ( $data, $status, $id_cliente )', {
        $data: data.data,
        $status: data.status,
        $id_cliente: data.id_cliente,
      })
    } catch (error) {
      
    }
  }

  async update() {}

  async delete() {}

  async findById(id: number ) {}

  async findAll() {}

  async getByCliente() {}

  async getByStatus() {}
}
