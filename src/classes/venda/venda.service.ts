import { SQLiteDatabase } from 'expo-sqlite';
import { VendaCreateObject } from './interfaces';
import { getDateFromString, getStringFromDate } from '@/utils';

export default class VendaService {

  constructor(private db: SQLiteDatabase) {}

  async create(data: VendaCreateObject) {
    try {
      const r = await this.db.runAsync('INSERT into venda ( data, status, id_cliente ) VALUES ( $data, $status, $id_cliente )', {
        $data: getStringFromDate(data.data),
        $status: data.status,
        $id_cliente: data.id_cliente,
      });
      if (r.changes < 1) {
        throw new Error("Nao foi possivel cadastrar a venda");
      }
      const id_venda = r.lastInsertRowId;
      await Promise.all( data.produtos.map(async (p) => {
        try {
          const res = await this.db.runAsync('INSERT into item_venda ( quantidade, valor_unitario, id_venda, id_produto ) VALUES ( $quantidade, $valor_unitario, $id_venda, $id_produto )', {
            $quantidade: p.quantidade,
            $valor_unitario: p.valor_unitario,
            $id_venda: id_venda,
            $id_produto: p.id_produto,
          });
          if (res.changes < 1) {
            throw new Error("Nao foi possivel cadastrar o item de venda!");
          }
        } catch (error) {
          throw error;
        }
      }))
    } catch (error) {
      throw error;
    }
  }

  async update() {}

  async delete() {}

  async search(tipo?: 'id' | 'nome' | 'data' | 'status', value1?: string | number | Date, value2?: Date)  {
    try {
      let params = '';
      if (tipo) {
        
      }
      const saldo
      const dados = await this.db.getAllAsync<{ nome: string; status: string; id: number; data_venda: string; }>(`SELECT p.nome, v.status, v.id, v.data as data_venda FROM venda as v INNER JOIN cliente as c ON c.id == v.id_cliente INNER JOIN pessoa as p ON p.id == c.id_pessoa ${params}`)
      if(dados.length < 1){
        throw new Error("Nao ha vendas cadastradas!");
      }
      const res = await Promise.all(dados.map(async (d) => {
        try {
          const { ...res } = d;
          const itns_venda = await this.db.getAllAsync<{ quantidade: number; valor_unitario: number }>('SELECT quantidade, valor_unitario FROM item_venda WHERE id_venda == $id', {
            $id: res.id,
          });
          if (itns_venda.length < 1) {
            throw new Error("Nao ha itens de venda!");
          }
          return { ...res, data_venda: getDateFromString(res.data_venda), valor: itns_venda.map((itv) => itv.quantidade * itv.valor_unitario).reduce((p, c) => p + c, 0)}
        } catch (error) {
          throw error;
        }
      }))
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findByIdDetails(){

  }

  async findByIdUpdate(){

  }

  async findAll() {}

  async getByCliente() {}

  async getByStatus() {}
}
