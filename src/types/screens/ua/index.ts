import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-uas'
>;

export type VisualisarUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-uas'
>;

export type CadastrarUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-ua'
>;

export type CadastrarUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-ua'
>;

export type AtualizarUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-ua'
>;

export type AtualizarUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-ua'
>;
