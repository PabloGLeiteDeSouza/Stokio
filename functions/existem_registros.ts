import { SQLiteDatabase } from 'expo-sqlite';

export default async function existem_registros(db: SQLiteDatabase) {
  try {
    const cliente = await db.getAllAsync('SELECT * FROM cliente'),
      email = await db.getAllAsync('SELECT * FROM email'),
      empresa = await db.getAllAsync('SELECT * FROM empresa'),
      item_venda = await db.getAllAsync('SELECT * FROM item_venda'),
      marca = await db.getAllAsync('SELECT * FROM marca'),
      pessoa = await db.getAllAsync('SELECT * FROM pessoa'),
      produto = await db.getAllAsync('SELECT * FROM produto'),
      ramo = await db.getAllAsync('SELECT * FROM ramo'),
      telefone = await db.getAllAsync('SELECT * FROM telefone'),
      tipo_de_unidade_de_armazenamento = await db.getAllAsync(
        'SELECT * FROM tipo_de_unidade_de_armazenamento',
      ),
      unidade_de_armazenamento = await db.getAllAsync(
        'SELECT * FROM unidade_de_armazenamento',
      ),
      unidade_de_medida = await db.getAllAsync(
        'SELECT * FROM unidade_de_medida',
      ),
      venda = await db.getAllAsync('SELECT * FROM venda'),
      tipo_produto = await db.getAllAsync('SELECT * FROM tipo_produto');

  } catch (error) {
    return false;
  }
}
