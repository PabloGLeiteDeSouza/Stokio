import { SelecionarMarcaStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectMarcaProps {
  navigation?: StackNavigationProp<
    SelecionarMarcaStackParamList,
    'selecionar-marca'
  >;
  route?: RouteProp<SelecionarMarcaStackParamList, 'selecionar-marca'>;
}
