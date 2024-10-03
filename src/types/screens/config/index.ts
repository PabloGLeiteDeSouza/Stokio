import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ConfiguracoesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'configuracoes'
>;
export type ConfiguracoesScreenRouteProp = RouteProp<
  RootStackParamList,
  'configuracoes'
>;
