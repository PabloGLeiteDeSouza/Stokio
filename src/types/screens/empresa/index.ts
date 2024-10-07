import { RootStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type VisualisarEmpresaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'visualizar-empresas'
>;

export type VisualisarEmpresaScreenRouterProp = RouteProp<
  RootStackParamList,
  'visualizar-empresas'
>;

export type CadastrarEmpresaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'cadastrar-empresa'
>;

export type CadastrarEmpresaScreenRouterProp = RouteProp<
  RootStackParamList,
  'cadastrar-empresa'
>;

export type AtualizarEmpresaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'atualizar-empresa'
>;

export type AtualizarEmpresaScreenRouterProp = RouteProp<
  RootStackParamList,
  'atualizar-empresa'
>;

export type DetalhesEmpresaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detalhes-empresa'
>;

export type DetalhesEmpresaScreenRouterProp = RouteProp<
  RootStackParamList,
  'detalhes-empresa'
>;

export type Empresa = {
  id: number | string;
  nome_fantasia: string;
  razao_social: string;
  cpf: string;
  cnpj?: string;
};

export type EmpresaObject = {
  id: number | string;
  nome_fantasia: string;
  razao_social: string;
  cnpj?: string;
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

export type EmpresaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Empresa,
    FlatListProps<Empresa>,
    'FlatList',
    typeof FlatList
  >
>;
