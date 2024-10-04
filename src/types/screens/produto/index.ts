import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-produtos'
>;

export type VisualisarProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-produtos'
>;

export type CadastrarProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-produto'
>;

export type CadastrarProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-produto'
>;

export type AtualizarProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-produto'
>;

export type AtualizarProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-produto'
>;
