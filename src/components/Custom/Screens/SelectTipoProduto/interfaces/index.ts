import { SelecionarTipoProdutoStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectTipoProdutoProps {
  navigation?: StackNavigationProp<
    SelecionarTipoProdutoStackParamList,
    'selecionar-tipo-produto'
  >;
  route?: RouteProp<
    SelecionarTipoProdutoStackParamList,
    'selecionar-tipo-produto'
  >;
}
