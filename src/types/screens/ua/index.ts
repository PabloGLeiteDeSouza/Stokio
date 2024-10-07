import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-uas'
>;

export type VisualisarUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-uas'
>;

export type CadastrarUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-ua'
>;

export type CadastrarUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-ua'
>;

export type AtualizarUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-ua'
>;

export type AtualizarUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-ua'
>;

export type DetalhesUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detalhes-ua'
>;

export type DetalhesUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'detalhes-ua'
>;

export type Ua = {
  id: number | string;
  nome: string;
  tipo: string;
};

export type UaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Ua,
    FlatListProps<Ua>,
    'FlatList',
    typeof FlatList
  >
>;
