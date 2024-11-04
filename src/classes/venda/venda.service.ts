import { SQLiteDatabase } from 'expo-sqlite';

export default class VendaService {
  constructor(private db: SQLiteDatabase) {}

  async create() {}

  async update() {}

  async delete() {}

  async findById(id: number ) {}

  async findAll() {}

  async getByCliente() {}

  async getByStatus() {}
}
