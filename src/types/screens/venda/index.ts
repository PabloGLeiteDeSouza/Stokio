import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarVendaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-vendas'
>;

export type VisualisarVendaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-vendas'
>;

export type CadastrarVendaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-venda'
>;

export type CadastrarVendaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-venda'
>;

export type AtualizarVendaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-venda'
>;

export type AtualizarVendaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-venda'
>;

export type DetalhesVendaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detalhes-venda'
>;

export type DetalhesVendaScreenRouterProp = RouteProp<
  RootStackParamList,
  'detalhes-venda'
>;

export type Venda = {
  id: number | string;
  nome: string;
  valor: number;
  status: string;
};

export type VendaObject = {
  id: number | string;
  valor: string;
  data_venda: string;
  data_atualizacao: string;
  status: string;
};

export type VendaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Venda,
    FlatListProps<Venda>,
    'FlatList',
    typeof FlatList
  >
>;
