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

export interface VendaDetails {
    data: Date;
    cliente: {
        data_nascimento: Date;
        id: number;
        nome: string;
        cpf: string;
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