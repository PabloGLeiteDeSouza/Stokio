import { formatValue } from '@/utils/calc';

export function onAddProduct(
  quantidade_disponivel: number,
  quantidade: number,
  valor_unitario: number,
  valor: number,
) {
    try {
        if (quantidade <= quantidade_disponivel) {
            return {
                quantidade: quantidade + 1,
                valor: valor + valor_unitario,
            };
        } else {
            throw new Error('Nao ha produtos disponiveis');
        }
    } catch (error) {
        throw error;
    }
}

export function onRemoveProduct(
    quantidade: number,
    valor_unitario: number,
    valor: number,
) {
 try {
    if (quantidade == 1) {
        throw new Error("Voce deseja remover o produto, apartir da confirmacao ele sera completamente desvinculado a essa compra?", { cause: "ERR_REMOVE_PRODUCT"});
    }
    return {
        quantidade: quantidade - 1,
        valor: formatValue(valor - valor_unitario),
    }
 } catch (error) {
    throw error;
 }
}

export function onUpdateProduct(
    quantidade: string,
    quantidade_anterior: number,
    valor_unitario: number,
    valor: number,
) {
 try {
    if (Number(quantidade) < 1) {
        throw new Error("Voce deseja remover o produto, apartir da confirmacao ele sera completamente desvinculado a essa compra?", { cause: "ERR_REMOVE_PRODUCT"});
    }
    return {
        quantidade: Number(quantidade),
        valor: formatValue((valor - (quantidade_anterior * valor_unitario)) + (Number(quantidade) * valor_unitario)),
    };
 } catch (error) {
    throw error;
 }
}
export default { onAddProduct, onUpdateProduct, onRemoveProduct };