import { SelecionarProdutoStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectProdutoProps {
  navigation?: StackNavigationProp<
    SelecionarProdutoStackParamList,
    'selecionar-produto'
  >;
  route?: RouteProp<SelecionarProdutoStackParamList, 'selecionar-produto'>;
}
