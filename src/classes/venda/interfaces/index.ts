import { Produto } from "@/classes/produto/interfaces";

export interface Venda {
    id: number;
    data: Date;
    status: string;
}

export interface ItemVenda {
    id: number;
    produto: Pick<Produto, 'id' | ''>;
}

export interface VendaWithItensVenda {

}

export interface VendaCreateObject {
    id_cliente: number;
    data: Date;
    status: "pago" | "devendo";
    produtos: {
        quantidade: number;
        valor_unitario: number;
        id_produto: number;
    }[];
}