import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarMarcaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-marcas'
>;

export type VisualisarMarcaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-marcas'
>;

export type CadastrarMarcaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-marca'
>;

export type CadastrarMarcaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-marca'
>;

export type AtualizarMarcaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-marca'
>;

export type AtualizarMarcaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-marca'
>;
