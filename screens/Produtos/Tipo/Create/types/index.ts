import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type CadastrarProdutosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-tipo-produto'
>;
export type CadastrarProdutosScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-tipo-produto'
>;
