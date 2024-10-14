import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarTipoUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-tipo-uas'
>;

export type VisualisarTipoUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-tipo-uas'
>;

export type CadastrarTipoUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-tipo-ua'
>;

export type CadastrarTipoUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-tipo-ua'
>;

export type AtualizarTipoUaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-tipo-ua'
>;

export type AtualizarTipoUaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-tipo-ua'
>;

export type TipoUa = {
  id: string;
  nome: string;
};

export type TipoUaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    TipoUa,
    FlatListProps<TipoUa>,
    'FlatList',
    typeof FlatList
  >
>;
