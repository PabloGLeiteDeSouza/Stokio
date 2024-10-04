import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarVendaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-vendas'
>;

export type VisualisarVendaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-vendas'
>;

export type CadastrarVendaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-venda'
>;

export type CadastrarVendaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-venda'
>;

export type AtualizarVendaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-venda'
>;

export type AtualizarVendaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-venda'
>;
