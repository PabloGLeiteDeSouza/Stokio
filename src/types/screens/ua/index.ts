import { UasStackParamList } from '$types/param-list';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';
import { TipoUaUpdate } from '@/classes/tipo_ua/interfaces';

export type VisualisarUaScreenNavigationProp = StackNavigationProp<
  UasStackParamList,
  'visualizar-uas'
>;

export type VisualisarUaScreenRouterProp = RouteProp<
  UasStackParamList,
  'visualizar-uas'
>;

export type CadastrarUaScreenNavigationProp = StackNavigationProp<
  UasStackParamList,
  'cadastrar-ua'
>;

export type CadastrarUaScreenRouterProp = RouteProp<
  UasStackParamList,
  'cadastrar-ua'
>;

export type AtualizarUaScreenNavigationProp = StackNavigationProp<
  UasStackParamList,
  'atualizar-ua'
>;

export type AtualizarUaScreenRouterProp = RouteProp<
  UasStackParamList,
  'atualizar-ua'
>;

export type DetalhesUaScreenNavigationProp = StackNavigationProp<
  UasStackParamList,
  'detalhes-ua'
>;

export type DetalhesUaScreenRouterProp = RouteProp<
  UasStackParamList,
  'detalhes-ua'
>;

export type Ua = {
  id: number;
  nome: string;
  tipo: string;
};

export type UaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Ua,
    FlatListProps<Ua>,
    'FlatList',
    typeof FlatList
  >
>;
