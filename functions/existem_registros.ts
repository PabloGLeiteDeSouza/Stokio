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

    if (cliente.length > 0) {
      return true;
    }
    if (email.length > 0) {
      return true;
    }
    if (empresa.length > 0) {
      return true;
    }
    if (item_venda.length > 0) {
      return true;
    }
    if (marca.length > 0) {
      return true;
    }
    if (pessoa.length > 0) {
      return true;
    }
    if (produto.length > 0) {
      return true;
    }
    if (ramo.length > 0) {
      return true;
    }
    if (telefone.length > 0) {
      return true;
    }
    if (tipo_de_unidade_de_armazenamento.length > 0) {
      return true;
    }
    if (unidade_de_armazenamento.length > 0) {
      return true;
    }
    if (unidade_de_medida.length > 0) {
      return true;
    }
    if (venda.length > 0) {
      return true;
    }
    if (tipo_produto.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
