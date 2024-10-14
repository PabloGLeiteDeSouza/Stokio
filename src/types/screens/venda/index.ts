import { VendasStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarVendaScreenNavigationProp = StackNavigationProp<
  VendasStackParamList,
  'visualizar-vendas'
>;

export type VisualisarVendaScreenRouterProp = RouteProp<
  VendasStackParamList,
  'visualizar-vendas'
>;

export type CadastrarVendaScreenNavigationProp = StackNavigationProp<
  VendasStackParamList,
  'cadastrar-venda'
>;

export type CadastrarVendaScreenRouterProp = RouteProp<
  VendasStackParamList,
  'cadastrar-venda'
>;

export type AtualizarVendaScreenNavigationProp = StackNavigationProp<
  VendasStackParamList,
  'atualizar-venda'
>;

export type AtualizarVendaScreenRouterProp = RouteProp<
  VendasStackParamList,
  'atualizar-venda'
>;

export type DetalhesVendaScreenNavigationProp = StackNavigationProp<
  VendasStackParamList,
  'detalhes-venda'
>;

export type DetalhesVendaScreenRouterProp = RouteProp<
  VendasStackParamList,
  'detalhes-venda'
>;

export type Venda = {
  id: string;
  data_venda: string;
  data_atualizacao: string;
  valor: number;
  status: string;
};

export type VendaObject = {
  id: string;
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
