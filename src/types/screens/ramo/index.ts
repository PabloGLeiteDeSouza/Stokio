import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type VisualisarRamoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-ramos'
>;

export type VisualisarRamoScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-ramos'
>;

export type CadastrarRamoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-ramo'
>;

export type CadastrarRamoScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-ramo'
>;

export type AtualizarRamoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-ramo'
>;

export type AtualizarRamoScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-ramo'
>;
