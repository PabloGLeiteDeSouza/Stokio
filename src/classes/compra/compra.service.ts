import { SQLiteDatabase } from 'expo-sqlite';
import { CompraCreate, CompraObjectBase, CompraObjectBaseToDetails, CompraObjectBaseUpdate, CompraUpdate, CompraViewObject, ItemCompraObjectBaseDetails, ItemDeCompraObjectBase } from './interfaces';
import { getDateFromString, getStringFromDate } from '@/utils';

export default class CompraService {
  constructor(private db: SQLiteDatabase) {}

  async create(dados: CompraCreate) {
    try {
      const { item_compra , ...compra } = dados;
      const dt = await this.db.runAsync('INSERT into compra ( data, status, id_empresa) VALUES ($data, $status, $id_empresa)', {
        $data: getStringFromDate(compra.data),
        $status: compra.status,
        $id_empresa: compra.id_empresa
      });
      if (dt.changes < 1) {
        throw new Error("Não foi possível criar a compra");
      }
      const id_compra = dt.lastInsertRowId;
      item_compra.forEach(async ({ id_produto, valor_unitario, quantidade }) => {
        const dt1 = await this.db.runAsync('INSERT into item_compra ( id_compra, id_produto, valor_unitario, quantidade ) VALUES ( $id_compra, $id_produto, $valor_unitario, $quantidade )', {
          $id_compra: id_compra,
          $id_produto: id_produto,
          $valor_unitario: valor_unitario,
          $quantidade: quantidade,
        })
        if (dt1.changes < 1) {
          throw new Error("Não foi possível criar o item da venda!");
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async update(dados: CompraUpdate) {
    try {
      const { itens_de_compra , ...compra } = dados;
      const res_compra = await this.db.runAsync('UPDATE compra SET data = $data, status = $status, id_empresa = $id_empresa WHERE id == $id', {
        $data: getStringFromDate(compra.data),
        $status: compra.status,
        $id_empresa: compra.id_empresa,
        $id: compra.id
      });
      if (res_compra.changes < 1) {
        throw new Error("Não foi possível atualizar a compra");
      }
      itens_de_compra.forEach(async (it) => {
        try {
          if (typeof it.id !== 'undefined' && it.id !== 0) {
            const itv_old = await this.db.getFirstAsync<{ id_produto: number; quantidade: number }>('SELECT id_produto, quantidade FROM item_compra WHERE id == $id', {
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
              if (it.quantidade < itv_old.quantidade) {
                const df = itv_old.quantidade - it.quantidade;
                if ((d_p.quantidade - df) < 0) {
                  throw new Error("Nao e possivel fazer a atualizacao pois o produto esta vinculado a vendas ja feitas!");
                }
                const updt = await this.db.runAsync('UPDATE item_compra SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: it.quantidade,
                  $id: it.id,
                })
                if (updt.changes < 1) {
                  throw new Error("Não foi possível atualizar o item da compra!");
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
                const updt = await this.db.runAsync('UPDATE item_compra SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: (itv_old.quantidade + df),
                  $id: it.id,
                })
                if (updt.changes < 1) {
                  throw new Error("Não foi possível atualizar o item da compra!");
                }
                const updt_prod = await this.db.runAsync('UPDATE produto SET quantidade = $quantidade WHERE id == $id', {
                  $quantidade: (itv_old.quantidade + df),
                  $id: it.id_produto
                });
                console.log(updt_prod);
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
                const res_cmp = await this.db.runAsync('UPDATE item_compra SET valor_unitario = $valor_unitario, quantidade = $quantidade, id_produto = $id_produto WHERE id == $id', {
                  $valor_unitario: it.valor_unitario,
                  $quantidade: it.quantidade,
                  $id_produto: it.id_produto,
                  $id: it.id
                });
                if (res_cmp.changes < 1) {
                  throw new Error("Não foi possível atualizar o item da compra!");
                }
                const res_new_prod = await this.db.runAsync('UPDATE produto SET quantidade = SUM(quantidade + $quantidade) WHERE id = $id', {
                  $quantidade: it.quantidade,
                  $id: it.id_produto,
                })
                if (res_new_prod.changes < 1) {
                  throw new Error("Não foi possível atualizar a compra!");
                }
              } else {
                throw new Error("Nao e possivel fazer a atualizacao pois o produto esta vinculado a vendas ja feitas!");
              }
            }
          } else {
            const res = await this.db.runAsync('INSERT into item_compra (quantidade, valor_unitario, id_compra, id_produto) VALUES ($quantidade, $valor_unitario, $id_compra, $id_produto )', {
              $quantidade: it.quantidade,
              $valor_unitario: it.valor_unitario,
              $id_compra: compra.id,
              $id_produto: it.id_produto
            })
            if (res.changes < 1) {
              throw new Error("Não foi possível atualizar a compra");
            }
          }
        } catch (error) {
          throw error;
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async delete() {}

  async findAll(): Promise<{
    id: number;
    status: string;
    data: Date;
    nome_empresa: string;
    valor_compra: number;
  }[]> {
    try {
      const result = await this.db.getAllAsync<{ id: number; status: string; data: string; nome_empresa: string; }>('SELECT c.id, c.data, c.status, e.nome_fantasia as nome_empresa FROM compra as c INNER JOIN empresa as e ON e.id == c.id_empresa');
      if (result.length < 1) {
        throw new Error("Nao fora m encontradas compras");
      }
      const res = await Promise.all(result.map(async (r) => {
        const valores = await this.db.getAllAsync<{ quantidade: number; valor_unitario: number; }>('SELECT quantidade, valor_unitario FROM item_compra WHERE id_compra == $id', {
          $id: r.id,
        });
        console.log('valores: ', valores);
        const valor_compra = valores.map((i) => (i.valor_unitario * i.quantidade)).reduce((a, v) => a + v, 0);
        return { id: r.id, status: r.status, data: getDateFromString(r.data), nome_empresa: r.nome_empresa, valor_compra };
      }))
      return res;
    } catch (err) {
      throw err;
    }
  }

  async findByIdToUpdate(id: number): Promise<CompraObjectBaseUpdate> {
    try {
      const c = await this.db.getFirstAsync<Omit<CompraObjectBase, 'data'> & { data: string; }>('SELECT * FROM compra WHERE id == $id', {
        $id: id,
      });
      if (!c) {
        throw new Error("Compra não encontrada");
      }
      const { data, ...cmp } = c;
      const compra = {
        ...cmp,
        data: getDateFromString(data),
      }; 
      type Empresa = { id: number; nome_fantasia: string; razao_social: string; cnpj: string | null; cpf: string; }
      const empresa = await this.db.getFirstAsync<Empresa>("SELECT e.id, e.nome_fantasia, e.razao_social, e.cnpj, p.cpf FROM empresa as e INNER JOIN pessoa as p ON p.id == e.id_pessoa WHERE e.id == $id", {
        $id: compra.id_empresa,
      })
      if (!empresa) {
        throw new Error("Empresa não encontrada");
      }
      const result_itens_compra = await this.db.getAllAsync<{
        id: number;
        quantidade: number;
        valor_unitario: number;
        id_produto: number;
        id_compra: number;
      }>("SELECT * FROM item_compra WHERE id_compra == $id", {
        $id: id,
      })

      if (result_itens_compra.length < 1) {
        throw new Error("Nao foram encontrados itens de compra");
      }
      const itens_de_compra = await Promise.all(result_itens_compra.map(async (itv) => {
        try {
          const res = await this.db.getFirstAsync<{
            id: number;
            data_validade: Date;
            codigo_de_barras: string;
            nome: string;
            tipo: string;
            marca: string;
            empresa: string;
            valor_unitario: number;
            quantidade: number;
        }>('SELECT p.id, p.data_de_validade as data_validade, p.codigo_de_barras, p.nome, tp.nome as tipo, mc.nome as marca, e.nome_fantasia as empresa, p.valor as valor_unitario, p.quantidade FROM produto as p INNER JOIN marca as mc ON mc.id == p.id_marca INNER JOIN tipo_produto as tp ON tp.id == p.id_tipo_produto INNER JOIN empresa as e ON e.id == p.id_empresa WHERE p.id == $id', {
          $id: itv.id_produto,
        })
        if (!res) {
          throw new Error("");
        }
        return { ...itv, produto: res };
        } catch (error) {
          throw error
        }
      }))
      return { ...compra, empresa, itens_de_compra };
    } catch (error) {
      throw error;
    }
  }

  async findByIdToDetails(id: number): Promise<CompraObjectBaseToDetails> {
    try {
      const compra = await this.db.getFirstAsync<{ id: number; data: string; status: string; }>('SELECT id, data, status FROM compra WHERE id == $id', {
        $id: id,
      });
      if (!compra) {
        throw new Error("Nenhuma compra foi encontrada"); 
      }
      const itens_compra = await this.db.getAllAsync<ItemCompraObjectBaseDetails>('SELECT ic.id, ic.quantidade, ic.valor_unitario, p.nome, e.nome_fantasia as empresa, m.nome as marca, tp.nome as tipo, p.tamanho, um.valor as medida FROM item_compra as ic INNER JOIN produto as p ON p.id == ic.id_produto INNER JOIN empresa as e ON e.id == p.id_empresa INNER JOIN marca as m ON m.id == p.id_marca INNER JOIN tipo_produto as tp ON tp.id == p.id_tipo_produto INNER JOIN um ON um.id == p.id_um WHERE ic.id_compra == $id', {
        $id: id,
      });
      if (itens_compra.length < 1) {
        throw new Error("Nenhum item de compra foi encontrada"); 
      }
      return { ...compra, itens_compra };
    } catch (error) {
      throw error;
    }
  }
}
