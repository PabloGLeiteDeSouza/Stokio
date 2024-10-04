import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarUmScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-ums'
>;

export type VisualisarUmScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-ums'
>;

export type CadastrarUmScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-um'
>;

export type CadastrarUmScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-um'
>;

export type AtualizarUmScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-um'
>;

export type AtualizarUmScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-um'
>;
