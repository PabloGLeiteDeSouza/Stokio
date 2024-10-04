import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-empresas'
>;

export type VisualisarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-empresas'
>;

export type CadastrarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-empresa'
>;

export type CadastrarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-empresa'
>;

export type AtualizarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-empresa'
>;

export type AtualizarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-empresa'
>;
