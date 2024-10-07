import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-produtos'
>;

export type VisualisarProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-produtos'
>;

export type CadastrarProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-produto'
>;

export type CadastrarProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-produto'
>;

export type AtualizarProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-produto'
>;

export type AtualizarProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-produto'
>;

export type DetalhesProdutoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detalhes-produto'
>;

export type DetalhesProdutoScreenRouterProp = RouteProp<
  RootStackParamList,
  'detalhes-produto'
>;

export type Produto = {
  id: number | string;
  nome: string;
  data_validade: string;
  tipo: string;
  marca: string;
};

export type ProdutoObject = {
  id: number | string;
  nome: string;
  codigo_de_barras: string;
  data_validade: string;
  valor: string;
  quantidate: string;
  tipo_produto: {
    id: number | string;
    nome: string;
  };
  marca: {
    id: number | string;
    nome: string;
  };
  um: {
    id: number | string;
    nome: string;
  };
  ua: {
    id: number | string;
    nome: string;
    tipo_ua: {
      id: number | string;
      nome: string;
    };
  };
};

export type ProdutoFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Produto,
    FlatListProps<Produto>,
    'FlatList',
    typeof FlatList
  >
>;
