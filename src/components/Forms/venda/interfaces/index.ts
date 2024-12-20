import { ReturnFunctions } from "@/types";

export interface IFormCreateVenda {
    haveClientes: boolean;
    haveProdutos: boolean;
    id_cliente?: number;
    id_produto?: number;
    indexUpdated?: number; 
    tipo?: 'create' | 'update'; 
    onCreateProduct: () => ReturnFunctions; 
    onCreateCliente: () => ReturnFunctions;
    onChangeCliente: (id_cliente: number) => ReturnFunctions;
    onAddProductToVenda: (produtos: Array<{ id_produto: number }>) => ReturnFunctions, 
    onUpdateProductToVenda: (produtos: Array<{ id_produto: number }>, i: number) => ReturnFunctions,
    onCreatedVenda: () => ReturnFunctions;
}