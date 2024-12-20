import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';
import { RamoObject } from '@/classes/empresa/types';

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

export type Ramo = {
  id: number;
  nome: string;
  descricao: string;
};

export type RamoFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    RamoObject,
    FlatListProps<RamoObject>,
    'FlatList',
    typeof FlatList
  >
>;
