import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ListarProdutosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-tipo-produto'
>;
export type ListarProdutosScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-tipo-produto'
>;
