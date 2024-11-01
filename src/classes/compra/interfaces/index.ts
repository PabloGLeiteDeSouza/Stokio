export interface CompraObjectBase {
    id: number;
    data: Date;
    status: string;
    id_empresa: number;
}

export interface ItemDeCompraObjectBase {
    id: number;
    quantidade: number;
    preço_unitario: number;
    id_compra: number;
    id_produto: number;
}

export interface ItemDeCompraCreate extends Omit<ItemDeCompraObjectBase, 'id'> {};

export interface CompraCreate extends Omit<CompraObjectBase, 'id'> {
    item_compra: Array<ItemDeCompraCreate>
};

export interface CompraUpdate extends CompraObjectBase {
    item_compra: Array<ItemDeCompraObjectBase>;
}

export interface CompraViewObject extends CompraObjectBase {
    valor_venda: number;
}