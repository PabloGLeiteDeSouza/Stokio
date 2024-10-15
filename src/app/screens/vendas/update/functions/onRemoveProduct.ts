import { Produto } from '@/types/screens/produto';
import { formatValue } from '@/utils/calc';

export default function onRemoveProduct(
  qtd: string,
  produto: Produto,
  valor_total: string,
  valor: string,
) {
  const result = {
    quantidade: '',
    valor_total: '',
    valor: '',
    remove: false,
  };
  if (Number(qtd) > 1) {
    result.quantidade = String(Number(qtd.replace(',', '.')) - 1);

    result.valor_total = formatValue(
      Number(result.quantidade.replace(',', '.')) *
        Number(produto.valor.replace(',', '.')),
    );
    result.valor = formatValue(
      Number(valor.replace(',', '.')) -
        Number(produto.valor.replace(',', '.')) *
          Number(qtd.replace(',', '.')) +
        Number(result.valor_total.replace(',', '.')),
    );
  } else {
    result.remove = true;
  }
  return result;
}
