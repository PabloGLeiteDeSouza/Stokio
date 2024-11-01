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