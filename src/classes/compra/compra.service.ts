import { SQLiteDatabase } from 'expo-sqlite';
import { CompraCreate } from './interfaces';

export default class CompraService {
  constructor(private db: SQLiteDatabase) {}

  async create(data: CompraCreate) {
    try {
        const dados = await this.db.runAsync('INSERT into compra ( data, ) VALUES ()')
    } catch (error) {
        
    }
  }

  async update() {}

  async delete() {}

  async findAll() {}

  async findById(id: number) {
    try {
      
    } catch (error) {
      
    }
  }
}
