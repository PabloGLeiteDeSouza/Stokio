import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarUmScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-ums'
>;

export type VisualisarUmScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-ums'
>;

export type CadastrarUmScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-um'
>;

export type CadastrarUmScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-um'
>;

export type AtualizarUmScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-um'
>;

export type AtualizarUmScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-um'
>;

export type Um = {
  id: string;
  nome: string;
};

export type UmFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Um,
    FlatListProps<Um>,
    'FlatList',
    typeof FlatList
  >
>;