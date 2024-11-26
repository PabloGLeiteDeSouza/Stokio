import { SQLiteDatabase } from 'expo-sqlite';
import { VendaCreateObject, VendaDetails } from './interfaces';
import { getDateFromString, getStringFromDate } from '@/utils';
import { ProdutoVendaRequest } from '../produto/interfaces';
import { string } from 'yup';

export default class VendaService {

  constructor(private db: SQLiteDatabase) {}

  async create(data: VendaCreateObject) {
    try {
      const dados = await this.db.getFirstAsync<{ saldo: number }>('SELECT saldo FROM cliente WHERE id == $id', { $id: data.id_cliente })
        if (!dados) {
          throw new Error("Não existe o cliente informado!");
        }
      const saldo = dados.saldo;
      const total = data.produtos.map((p) => p.valor_unitario * p.quantidade).reduce((p, c) => p + c, 0);
      if (saldo < total) {
        throw new Error("Cliente nao possui saldo suficiente");
      }
      const r_c = await this.db.runAsync('UPDATE cliente SET saldo = $saldo WHERE id = $id', {
        $id: data.id_cliente,
        $saldo: (saldo - total),
      });
      if (r_c.changes < 1) {
        throw new Error("Não foi possivel atualizar o saldo do cliente");
      }
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

  async update(dados) {
    try {
      
    } catch (error) {
      
    }
  }

  async delete() {}

  async search(tipo?: 'id' | 'nome' | 'data' | 'status', value1?: string | number | Date, value2?: Date)  {
    try {
      let params = '';
      if (tipo) {
        
      }
      const dados = await this.db.getAllAsync<{ nome: string; status: string; id: number; data_venda: string; saldo: number}>(`SELECT p.nome, c.saldo, v.status, v.id, v.data as data_venda FROM venda as v INNER JOIN cliente as c ON c.id == v.id_cliente INNER JOIN pessoa as p ON p.id == c.id_pessoa ${params}`)
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
          const valor = itns_venda.map((itv) => itv.quantidade * itv.valor_unitario).reduce((p, c) => p + c, 0);
          return { ...res, data_venda: getDateFromString(res.data_venda), valor };
        } catch (error) {
          throw error;
        }
      }))
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findByIdDetails(id: number): Promise<VendaDetails>{
    try {
      const venda = await this.db.getFirstAsync<{ id: number; data: string; status: string; id_cliente: number; }>('SELECT * FROM venda WHERE id == $id', {
        $id: id,
      });
      if(!venda){
        throw new Error("Venda nao encontrada!");
      }
      const cliente = await this.db.getFirstAsync<{ id: number, nome: string; cpf: string; data_nascimento: string; }>("SELECT c.id, p.nome, p.cpf, p.data_nascimento FROM cliente as c INNER JOIN pessoa as p ON p.id == c.id_pessoa WHERE p.id == $id", {
        $id: venda.id_cliente,
      })
      if(!cliente){
        throw new Error("Cliente nao encontrado!");
      }
      const itens_de_venda = await this.db.getAllAsync<{ id: number; quantidade: number; valor_unitario: number; nome: string; tipo: string; marca: string;}>("SELECT id.itv, itv.quantidade, itv.valor_unitario, p.nome, m.nome as marca, t.nome as tipo FROM item_venda as itv INNER JOIN produto as p ON p.id == itv.id_produto INNER JOIN marca as m ON m.id == p.id_marca INNER JOIN tipo_produto as t ON t.id == p.id_tipo_produto WHERE itv.id_venda == $id", {
        $id: id,
      })
      if (itens_de_venda.length < 1) {
        throw new Error("Nao ha itens de venda!");
      }
      return { ...venda, data: getDateFromString(venda.data), cliente: { ...cliente, data_nascimento: getDateFromString(cliente.data_nascimento) }, itens_de_venda }
    } catch (error) {
      throw error;
    }
  }

  async findByIdUpdate(id: number){
    try {
      const venda = await this.db.getFirstAsync<{ id: number; data: string; status: string; id_cliente: number; }>('SELECT * FROM venda WHERE id == $id', {
        $id: id,
      });
      if (!venda) {
        throw new Error("Venda não encontrada!");
      }
      const cliente = await this.db.getFirstAsync<{id: number; nome: string; cpf: string;}>(
        `SELECT c.id, p.cpf, p.nome FROM cliente as c INNER JOIN pessoa as p ON p.id == c.id_pessoa WHERE c.id = $id`,
        { $id: venda.id_cliente },
      );
      if (!cliente) {
        throw new Error('Cliente não encontrado!');
      }
      const itv_res = await this.db.getAllAsync<{ id: number; quantidade: number; valor_unitario: number, id_produto: number }>('SELECT * FROM item_venda WHERE id_venda == $id', {
        $id: id,
      });
      if (itv_res.length < 1) {
        throw new Error("Nao ha itens de venda!");
      }
      const itens_de_venda = await Promise.all(itv_res.map(async ({ id, quantidade, valor_unitario, id_produto }) => {
        try {
          const res = await this.db.getFirstAsync<ProdutoVendaRequest>('SELECT p.id, p.codigo_de_barras, p.data_de_validade as data_validade, p.nome, p.valor as valor_unitario, p.quantidade, e.nome_fantasia as empresa, m.nome as marca, t.nome as tipo FROM produto as p INNER JOIN marca as m ON m.id == p.id_marca INNER JOIN empresa as e ON e.id == p.id_empresa INNER JOIN tipo_produto as t ON t.id == p.id_tipo_produto WHERE p.id == $id', {
            $id: id_produto,
          });
          if(!res){
            throw new Error("Nao foi possivel encontrar o produto!");
          }
          return { id, quantidade, valor_unitario, produto: { ...res, data_validade: getDateFromString(res.data_validade) } }
        } catch (error) {
          throw error;
        }
      }));
      return { ...venda, data: getDateFromString(venda.data), cliente, itens_de_venda }
    } catch (error) {
      throw error;
    }
  }

  async findAll() {}

  async getByCliente() {}

  async getByStatus() {}
}
