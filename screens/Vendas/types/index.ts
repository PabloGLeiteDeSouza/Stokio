import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ListarVendasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-venda'
>;
export type ListarVendasScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-venda'
>;
export type CadastrarVendasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-venda'
>;
export type CadastrarVendasScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-venda'
>;

export type AtualizarVendasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-venda'
>;
export type AtualizarVendasScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-venda'
>;
