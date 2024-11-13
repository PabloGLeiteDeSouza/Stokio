import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarMarcaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-marcas'
>;

export type VisualisarMarcaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-marcas'
>;

export type CadastrarMarcaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-marca'
>;

export type CadastrarMarcaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-marca'
>;

export type AtualizarMarcaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-marca'
>;

export type AtualizarMarcaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-marca'
>;

export type Marca = {
  id: number;
  nome: string;
};

export type MarcaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Marca,
    FlatListProps<Marca>,
    'FlatList',
    typeof FlatList
  >
>;
