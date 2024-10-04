import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-clientes'
>;

export type VisualisarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-clientes'
>;

export type CadastrarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-cliente'
>;

export type CadastrarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-cliente'
>;

export type AtualizarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-cliente'
>;

export type AtualizarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-cliente'
>;
