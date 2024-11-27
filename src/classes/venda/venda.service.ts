import { SQLiteDatabase, SQLiteVariadicBindParams } from 'expo-sqlite';
import { UpdateVenda, VendaCreateObject, VendaDetails } from './interfaces';
import { getDateFromString, getStringFromDate } from '@/utils';
import { ProdutoVendaRequest } from '../produto/interfaces';

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

  async update(dados: UpdateVenda) {
    try {
      const { itens_de_venda , ...venda } = dados;
      const res_venda = await this.db.runAsync('UPDATE venda SET data = $data, status = $status, id_empresa = $id_empresa WHERE id == $id', {
        $data: getStringFromDate(venda.data),
        $status: venda.status,
        $id_empresa: venda.id_empresa,
        $id: venda.id
      });
      if (res_venda.changes < 1) {
        throw new Error("Não foi possível atualizar a venda");
      }
      await Promise.all(itens_de_venda.map(async (it) => {
        try {
          if (typeof it.id !== 'undefined' && it.id !== 0) {
            const itv_old = await this.db.getFirstAsync<{ id_produto: number; quantidade: number }>('SELECT id_produto, quantidade FROM item_venda WHERE id == $id', {
              $id: it.id
            });
            if (!itv_old) {
              throw new Error("Nao foi possivel encontrar o item da venda");
            }
            const d_p = await this.db.getFirstAsync<{ quantidade: number }>("SELECT quantidade FROM produto WHERE id == $id", {
              $id: itv_old.id_produto,
            });
            if (!d_p) {
              throw new Error("Nao foi possivel encontrar o produto");
            }
            if (it.id_produto === itv_old.id_produto) {
              if (it.quantidade > itv_old.quantidade) {
                const df = itv_old.quantidade - it.quantidade;
                if ((d_p.quantidade - df) < 0) {
                  throw new Error("Nao e possivel fazer a atualizacao pois nao ha produtos para esta venda!");
                }
                const updt = await this.db.runAsync('UPDATE item_venda SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: it.quantidade,
                  $id: it.id,
                })
                if (updt.changes < 1) {
                  throw new Error("Não foi possível atualizar o item da venda!");
                }
                const updt_prod = await this.db.runAsync('UPDATE produto SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: (d_p.quantidade - df),
                  $id: it.id_produto
                });
                if (updt_prod.changes < 1) {
                  throw new Error("Não foi possível atualizar o produto!");
                }
              } else {
                const df = it.quantidade - itv_old.quantidade;
                const updt = await this.db.runAsync('UPDATE item_venda SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: it.quantidade,
                  $id: it.id,
                })
                if (updt.changes < 1) {
                  throw new Error("Não foi possível atualizar o item da venda!");
                }
                const updt_prod = await this.db.runAsync('UPDATE produto SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: (d_p.quantidade + df),
                  $id: it.id_produto
                });
                if (updt_prod.changes < 1) {
                  throw new Error("Não foi possível atualizar o produto!");
                }
              }
            } else {
              if((itv_old.quantidade - d_p.quantidade) >= 0){
                const res = await this.db.runAsync('UPDATE produto SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: (itv_old.quantidade - d_p.quantidade),
                  $id: itv_old.id_produto,
                });
                if (res.changes < 1) {
                  throw new Error("Não foi possível atualizar o produto!");
                }
                const res_cmp = await this.db.runAsync('UPDATE item_venda SET valor_unitario = $valor_unitario, quantidade = $quantidade, id_produto = $id_produto WHERE id == $id', {
                  $valor_unitario: it.valor_unitario,
                  $quantidade: it.quantidade,
                  $id_produto: it.id_produto,
                  $id: it.id
                });
                if (res_cmp.changes < 1) {
                  throw new Error("Não foi possível atualizar o item da venda!");
                }
                const res_new_prod = await this.db.runAsync('UPDATE produto SET quantidade = SUM(quantidade + $quantidade) WHERE id = $id', {
                  $quantidade: it.quantidade,
                  $id: it.id_produto,
                })
                if (res_new_prod.changes < 1) {
                  throw new Error("Não foi possível atualizar a venda!");
                }
              } else {
                throw new Error("Nao e possivel fazer a atualizacao pois o produto esta vinculado a vendas ja feitas!");
              }
            }
          } else {
            const res = await this.db.runAsync('INSERT into item_venda (quantidade, valor_unitario, id_venda, id_produto) VALUES ($quantidade, $valor_unitario, $id_venda, $id_produto )', {
              $quantidade: it.quantidade,
              $valor_unitario: it.valor_unitario,
              $id_venda: venda.id,
              $id_produto: it.id_produto
            })
            if (res.changes < 1) {
              throw new Error("Não foi possível atualizar a venda");
            }
          }
        } catch (error) {
          throw error;
        }
      }));
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const itens = await this.db.getAllAsync<{ id: number; quantidade: number; id_produto: number }>('SELECT id, quantidade, id_produto FROM item_venda WHERE id_venda == $id', {
        $id: id
      })
      if (itens.length < 0) {
        throw new Error("Não foi possível deletar a venda pois não existe itens vinculados a venda");
      }
      await Promise.all(itens.map(async (item) => {
        try {
          const res = await this.db.runAsync('UPDATE produto SET quantidade = SUM(quantidade + $quantidade) WHERE id == $id', {
            $quantidade: item.quantidade,
            id: item.id_produto,
          });
          if (res.changes < 1) {
            throw new Error("Não foi possível atualizar o produto!");
          }
          const res_it = await this.db.runAsync('DELETE FROM item_venda WHERE id == $id', {
            $id: item.id,
          })
          if (res_it.changes < 1) {
            throw new Error("Não foi possível deletar o item da venda!");
          }
        } catch (error) {
          throw error;
        }
      }));
      const res = await this.db.runAsync('DELETE FROM venda WHERE id == $id', {
        $id: id
      });
      if (res.changes < 1) {
        throw new Error("Não foi possível deletar a venda!");
      }
    } catch (error) {
      throw error;
    }
  }

  async search(value?: string | number | Date, tipo?: 'nome_pessoa' | 'data' | 'status' | 'valor', value1?: Date)  {
    try {
      const pesquisa = { query: "", params: {  }};
      switch (tipo) {
        case 'data':
          if (typeof value !== 'undefined' && typeof value !== "string" && typeof value !== 'number' && typeof value1 !== 'undefined') {
            pesquisa.query = ' WHERE v.data >= $data_inicial AND v.data <= $data_final';
            pesquisa.params = { $data_inicial: getStringFromDate(value), $data_final: getStringFromDate(value1) };
          }
          break;
        case 'nome_pessoa':
          if (typeof value === "string") {
            pesquisa.query = ` WHERE p.nome LIKE '%' || $nome || '%'`;
            pesquisa.params = { $nome: value };
          }
          break;
        case 'status':
          if (typeof value === "string") {
            pesquisa.query = ` WHERE v.status LIKE '%' || $status || '%'`;
            pesquisa.params = { $status: value };
          }
          break;
        case 'valor':
          if (typeof value === "number") {
            pesquisa.query = ` WHERE v.valor == $valor`;
            pesquisa.params = { $valor: value };
          }
          break;
        default:
          
          break;
      }
      const dados = await this.db.getAllAsync<{ nome: string; status: string; id: number; data_venda: string; }>(`SELECT p.nome, c.saldo, v.status, v.id, v.data as data_venda FROM venda as v INNER JOIN cliente as c ON c.id == v.id_cliente INNER JOIN pessoa as p ON p.id == c.id_pessoa ${pesquisa.query}`, pesquisa.params)
      if(dados.length < 1){
        throw new Error("Nao ha vendas cadastradas!");
      }
      const vendas = await Promise.all(dados.map(async (v) => {
        try {
          const itv = await this.db.getAllAsync<{ id: number; quantidade: number; valor_unitario: number; }>('SELECT * FROM item_venda WHERE id_venda == $id', {
            $id: v.id,
          });
          if (itv.length < 1) {
            throw new Error("Nao ha itens de venda para essa venda!");
          }
          return { ...v, data_venda: getDateFromString(v.data_venda), valor: itv.map(({ quantidade, valor_unitario }) => quantidade * valor_unitario).reduce((p, c) => p + c, 0) };
        } catch (error) {
          throw error;
        }
      }))
      return vendas;
    } catch (error) {
      throw error;
    }
  }

  async findByIdDetails(id: number): Promise<VendaDetails>{
    try {
      const venda = await this.db.getFirstAsync<{id: number; data: string; status: string; id_cliente: number;}>('SELECT * FROM venda WHERE id == $id', {
        $id: id,
      });
      if (!venda) {
        throw new Error("Venda não encontrada!");
      }
      const cliente = await this.db.getFirstAsync<{ id: number; nome: string; cpf: string; data_nascimento: string; }>('SELECT * FROM cliente WHERE id == $id', {
        $id: venda.id_cliente
      });
      if (!cliente) {
        throw new Error("Cliente não encontrado!");
      }
      const itens_de_venda = await this.db.getAllAsync<{ id: number; quantidade: number; valor_unitario: number; nome: string; tipo: string; marca: string; }>('SELECT itv.id, itv.quantidade, itv.valor_unitario, p.nome, t.nome as tipo, m.nome as marca FROM item_venda INNER JOIN produto as p ON p.id == itv.id_produto INNER JOIN tipo_produto as t ON t.id == p.id_tipo_produto INNER JOIN marca as m ON m.id == p.id_marca WHERE itv.id_venda == $id', {
        $id: id,
      });
      if(itens_de_venda.length < 1){
        throw new Error("Nao ha itens de venda para essa venda!");
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
