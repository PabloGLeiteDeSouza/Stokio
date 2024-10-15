import { Produto } from '@/types/screens/produto';
import { formatValue } from '@/utils/calc';
export default function onUpdateProduct(
  value: string,
  produto: Produto,
  vl: string,
  vl_tot: string,
) {
  const text = value.replace(',', '.'),
    valor = vl.replace(',', '.'),
    valor_total = vl_tot.replace(',', '.'),
    result = {
      quantidade: '',
      valor_total: '',
      valor_produto: '',
      erro: false,
      remove: false,
    };
  if (Number(text) <= Number(produto.quantidade) && Number(text) !== 0) {
    const temp_value = `${Number(valor.replace(',', '.')) - Number(valor_total.replace(',', '.'))}`;
    result.quantidade = text;
    result.valor_produto = formatValue(Number(produto.valor) * Number(text));
    result.valor_total = formatValue(
      Number(temp_value) + Number(result.valor_produto.replace(',', '.')),
    );
  } else if (Number(text) > Number(produto.quantidade)) {
    result.erro = true;
  } else if (Number(text) == 0) {
    result.remove = true;
  }
  return result;
}
