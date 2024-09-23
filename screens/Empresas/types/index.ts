import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ListarRamosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-marca'
>;
export type ListarRamosScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-marca'
>;
export type CadastrarRamossScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-marca'
>;
export type CadastrarRamosScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-marca'
>;

export type AtualizarRamossScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editar-marca'
>;
export type AtualizarRamosScreenRouteProp = RouteProp<
  RootStackParamList,
  'editar-marca'
>;
