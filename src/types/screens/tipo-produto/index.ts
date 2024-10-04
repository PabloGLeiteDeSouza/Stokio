import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarTipoProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-tipo-produtos'
>;

export type VisualisarTipoProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-tipo-produtos'
>;

export type CadastrarTipoProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-tipo-produto'
>;

export type CadastrarTipoProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-tipo-produto'
>;

export type AtualizarTipoProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-tipo-produto'
>;

export type AtualizarTipoProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-tipo-produto'
>;
