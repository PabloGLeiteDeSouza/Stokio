import { RootStackParamList } from '@/types';
import { Empresa } from '@/types/screens/empresa';
import { ViewStyle } from '@expo/html-elements/build/primitives/View';
import { StyledComponentProps } from '@gluestack-style/react/lib/typescript/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, FlatListProps, StyleProp } from 'react-native';

export type ModalVendaFlatList = React.ForwardRefExoticComponent<
  StyledComponentProps<
    StyleProp<ViewStyle>,
    Empresa,
    FlatListProps<Empresa>,
    'FlatList',
    typeof FlatList
  >
>;

export type SelectClienteNavigationProp =
  StackNavigationProp<RootStackParamList>;
