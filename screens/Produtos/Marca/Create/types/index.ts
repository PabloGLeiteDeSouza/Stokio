import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type CadastrarMarcasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-marca'
>;
export type CadastrarMarcasScreenRouteProp = RouteProp<
  RootStackParamList,
  'cadastrar-marca'
>;
