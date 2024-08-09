import { RootStackParamList } from '$types/index';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ListarMarcasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'listar-marca'
>;
export type ListarMarcasScreenRouteProp = RouteProp<
  RootStackParamList,
  'listar-marca'
>;
