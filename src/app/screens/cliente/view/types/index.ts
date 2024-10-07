import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type Cliente = {
  id: number | string;
  nome: string;
  cpf: string;
  data_nascimento: string;
  endereco: {
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

export type ClientFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Cliente,
    FlatListProps<Cliente>,
    'FlatList',
    typeof FlatList
  >
>;
