import { ProdutosStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';
import { Empresa } from '../empresa';

export type VisualisarProdutoScreenNavigationProp = StackNavigationProp<
  ProdutosStackParamList,
  'visualizar-produtos'
>;

export type VisualisarProdutoScreenRouterProp = RouteProp<
  ProdutosStackParamList,
  'visualizar-produtos'
>;

export type CadastrarProdutoScreenNavigationProp = StackNavigationProp<
  ProdutosStackParamList,
  'cadastrar-produto'
>;

export type CadastrarProdutoScreenRouterProp = RouteProp<
  ProdutosStackParamList,
  'cadastrar-produto'
>;

export type AtualizarProdutoScreenNavigationProp = StackNavigationProp<
  ProdutosStackParamList,
  'atualizar-produto'
>;

export type AtualizarProdutoScreenRouterProp = RouteProp<
  ProdutosStackParamList,
  'atualizar-produto'
>;

export type DetalhesProdutoScreenNavigationProp = StackNavigationProp<
  ProdutosStackParamList,
  'detalhes-produto'
>;

export type DetalhesProdutoScreenRouterProp = RouteProp<
  ProdutosStackParamList,
  'detalhes-produto'
>;

export type Produto = {
  id: number | string;
  codigo_de_barras: string;
  nome: string;
  data_validade: string;
  tipo: string;
  marca: string;
  empresa: string;
  quantidade: string;
};

export type ProdutoObject = {
  id: number | string;
  nome: string;
  codigo_de_barras: string;
  data_validade: string;
  valor: string;
  quantidate: string;
  empresa: Empresa;
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
