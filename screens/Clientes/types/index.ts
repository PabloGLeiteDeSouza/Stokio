import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ListarClientesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-marca'
>;
export type ListarClientesScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-marca'
>;
export type CadastrarClientesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-marca'
>;
export type CadastrarClientesScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-marca'
>;

export type AtualizarClientesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-marca'
>;
export type AtualizarClientesScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-marca'
>;
