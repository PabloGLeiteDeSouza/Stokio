import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-clientes'
>;

export type VisualisarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-clientes'
>;

export type CadastrarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-cliente'
>;

export type CadastrarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-cliente'
>;

export type AtualizarClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-cliente'
>;

export type AtualizarClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-cliente'
>;

export type DetalhesClienteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detalhes-cliente'
>;

export type DetalhesClienteScreenRouterProp = RouteProp<
  RootStackParamList,
  'detalhes-cliente'
>;

export type Cliente = {
  id: number | string;
  nome: string;
  cpf: string;
  data_nascimento: string;
};

export type ClienteObject = {
  id: number | string;
  nome: string;
  cpf: string;
  data_nascimento: string;
  saldo: string;
  endereco: {
    id: number | string;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  telefones: Array<{ numero: string }>;
  emails: Array<{ endereco: string }>;
};

export type Pessoa = {
  id: number | string;
  nome: string;
  cpf: string;
  data_nascimento: string;
};

export type PessoaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Pessoa,
    FlatListProps<Pessoa>,
    'FlatList',
    typeof FlatList
  >
>;

export type ClienteFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Cliente,
    FlatListProps<Cliente>,
    'FlatList',
    typeof FlatList
  >
>;
