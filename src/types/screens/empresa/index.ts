import { EmpresasStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';
import { EmpresaSearchRelatinalPessoa } from '@/classes/empresa/types';

export type VisualisarEmpresaScreenNavigationProp = StackNavigationProp<
  EmpresasStackParamList,
  'visualizar-empresas'
>;

export type VisualisarEmpresaScreenRouterProp = RouteProp<
  EmpresasStackParamList,
  'visualizar-empresas'
>;

export type CadastrarEmpresaScreenNavigationProp = StackNavigationProp<
  EmpresasStackParamList,
  'cadastrar-empresa'
>;

export type CadastrarEmpresaScreenRouterProp = RouteProp<
  EmpresasStackParamList,
  'cadastrar-empresa'
>;

export type AtualizarEmpresaScreenNavigationProp = StackNavigationProp<
  EmpresasStackParamList,
  'atualizar-empresa'
>;

export type AtualizarEmpresaScreenRouterProp = RouteProp<
  EmpresasStackParamList,
  'atualizar-empresa'
>;

export type DetalhesEmpresaScreenNavigationProp = StackNavigationProp<
  EmpresasStackParamList,
  'detalhes-empresa'
>;

export type DetalhesEmpresaScreenRouterProp = RouteProp<
  EmpresasStackParamList,
  'detalhes-empresa'
>;

export type Empresa = {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cpf: string;
  cnpj: string | null;
};

export type EmpresaObject = {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string | null;
  saldo: string;
  endereco: {
    id: number;
    cep: string;
    rua: string;
    numero: string;
    complemento: string | null;
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
