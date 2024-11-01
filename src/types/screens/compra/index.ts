import { ComprasStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';
import { CompraViewObject } from '@/classes/compra/interfaces';

export type VisualisarCompraScreenNavigationProp = StackNavigationProp<
  ComprasStackParamList,
  'visualizar-compras'
>;

export type VisualisarCompraScreenRouterProp = RouteProp<
  ComprasStackParamList,
  'visualizar-compras'
>;

export type CadastrarCompraScreenNavigationProp = StackNavigationProp<
  ComprasStackParamList,
  'cadastrar-compra'
>;

export type CadastrarCompraScreenRouterProp = RouteProp<
  ComprasStackParamList,
  'cadastrar-compra'
>;

export type AtualizarCompraScreenNavigationProp = StackNavigationProp<
  ComprasStackParamList,
  'atualizar-compra'
>;

export type AtualizarCompraScreenRouterProp = RouteProp<
  ComprasStackParamList,
  'atualizar-compra'
>;

export type DetalhesCompraScreenNavigationProp = StackNavigationProp<
  ComprasStackParamList,
  'detalhes-compra'
>;

export type DetalhesCompraScreenRouterProp = RouteProp<
  ComprasStackParamList,
  'detalhes-compra'
>;


export type CompraFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    CompraViewObject,
    FlatListProps<CompraViewObject>,
    'FlatList',
    typeof FlatList
  >
>;