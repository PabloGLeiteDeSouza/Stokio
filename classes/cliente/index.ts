import { SQLiteDatabase } from 'expo-sqlite';

export class Cliente {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async create() {}

  async update() {}

  async findUnique() {}

  async findAllBy

  async findAll() {}

  async delete() {}

  async disable() {}
}
