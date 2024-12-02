import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';
import { TipoProdutoUpdate } from '@/classes/tipo_produto/interfaces';

export type VisualisarTipoProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-tipo-produtos'
>;

export type VisualisarTipoProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-tipo-produtos'
>;

export type CadastrarTipoProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-tipo-produto'
>;

export type CadastrarTipoProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-tipo-produto'
>;

export type AtualizarTipoProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-tipo-produto'
>;

export type AtualizarTipoProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-tipo-produto'
>;

export type TipoProdutoFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    TipoProdutoUpdate,
    FlatListProps<TipoProdutoUpdate>,
    'FlatList',
    typeof FlatList
  >
>;
