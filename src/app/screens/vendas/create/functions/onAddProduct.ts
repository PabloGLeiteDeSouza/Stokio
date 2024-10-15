import { Produto } from '@/types/screens/produto';
import { formatValue } from '@/utils/calc';
import { Alert } from 'react-native';

export default function onAddProduct(
  qtd: string,
  valor: string,
  produto: Produto,
) {
  if (Number(qtd) <= Number(produto.quantidade)) {
    return {
      quantidade: `${Number(qtd) + 1}`,
      valor_produto: formatValue(
        Number(produto.valor.replace(',', '.')) * (Number(qtd) + 1),
      ),
      valor: formatValue(
        `${Number(valor.replace(',', '.')) + Number(produto.valor.replace(',', '.'))}`,
      ),
    };
  } else {
    Alert.alert('Aviso', 'Quantidade indisponível');
    return;
  }
}
