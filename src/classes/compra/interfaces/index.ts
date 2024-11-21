export interface CompraObjectBase {
    id: number;
    data: Date;
    status: string;
    id_empresa: number;
}

export interface ItemDeCompraObjectBase {
    id: number;
    quantidade: number;
    valor_unitario: number;
    id_compra: number;
    id_produto: number;
}

export interface ItemDeCompraCreate extends Omit<ItemDeCompraObjectBase, 'id' | 'id_compra'> {};

export interface CompraCreate extends Omit<CompraObjectBase, 'id'> {
    item_compra: Array<ItemDeCompraCreate>
};

export interface CompraUpdate extends CompraObjectBase {
    item_compra: Array<ItemDeCompraObjectBase>;
}

export interface CompraViewObject extends Omit<CompraObjectBase, 'id_empresa'> {
    nome_empresa: string;
    valor_compra: number;
}


export interface ItemCompraObjectBaseDetails {
    id: number;
    quantidade: number;
    valor_unitario: number;
    nome: string;
    empresa: string;
    marca: string;
    tipo: string;
    tamanho: number;
    medida: string;
}

export interface CompraObjectBaseToDetails {
    id: number;
    data: string;
    status: string;
    itens_compra: Array<ItemCompraObjectBaseDetails>
}

export interface CompraObjectBaseUpdate {
    produtos: {
        id: number,
        codigo_de_barras: string;
        nome: string;
        tipo: string;
        marca: string;
        empresa: string;
        data_validade: Date;
        valor_total: number,
        valor_unitario: number,
        quantidade: number,
        quantidade_disponivel: number,
    }[],
    empresa: {
      id: number,
      nome_fantasia: string,
      razao_social: string,
      cpf: string,
      cnpj: string | null,
    };
    valor: number,
    data: Date,
    status: string,
}