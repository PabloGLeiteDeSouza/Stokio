import { SQLiteDatabase } from 'expo-sqlite';

export default async function existem_registros(db: SQLiteDatabase) {
  try {
    if ((await db.getAllAsync('SELECT * FROM cliente')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM email')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM empresa')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM item_venda')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM marca')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM pessoa')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM produto')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM ramo')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM telefone')).length > 0) {
      return true;
    }
    if (
      (await db.getAllAsync('SELECT * FROM tipo_de_unidade_de_armazenamento'))
        .length > 0
    ) {
      return true;
    }
    if (
      (await db.getAllAsync('SELECT * FROM unidade_de_armazenamento')).length >
      0
    ) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM unidade_de_medida')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM venda')).length > 0) {
      return true;
    }
    if ((await db.getAllAsync('SELECT * FROM tipo_produto')).length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
