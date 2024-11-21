import { ReturnFunctions } from "@/types";

export interface IFormCreateVenda {
    haveClientes: boolean;
    haveProdutos: boolean;
    id_cliente?: number;
    produto: { id_produto?: number; i?: number; type?: 'create' | 'update'}; 
    onCreateProduct: () => ReturnFunctions; 
    onCreateCliente: () => ReturnFunctions;
    onChangeCliente: (id_cliente: number) => ReturnFunctions;
    onAddProductToVenda: (produtos: Array<{ id: number }>) => ReturnFunctions, 
    onUpdateProductToVenda: (produtos: Array<{ id: number }>, i: number) => ReturnFunctions,
}