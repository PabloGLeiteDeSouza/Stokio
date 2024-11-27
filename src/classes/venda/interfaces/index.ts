import { Produto } from "@/classes/produto/interfaces";

export interface Venda {
    id: number;
    data: Date;
    status: string;
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

export interface VendaDetails {
    cliente: {
        id: number;
        nome: string;
        cpf: string;
        data_nascimento: Date;
    };
    itens_de_venda: {
        id: number;
        quantidade: number;
        valor_unitario: number;
        nome: string;
        tipo: string;
        marca: string;
    }[];
    id: number;
    data: Date;
    status: string;
    id_cliente: number;
}

export interface UpdateVenda {
    id: number;
    status: string;
    data: Date;
    id_empresa: number;
    itens_de_venda: {
        id?: number;
        quantidade: number;
        valor_unitario: number;
        id_produto: number;
    }[]
}