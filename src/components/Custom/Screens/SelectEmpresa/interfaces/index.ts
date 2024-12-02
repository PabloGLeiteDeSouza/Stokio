import { SelecionarEmpresaStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectEmpresaProps {
  navigation?: StackNavigationProp<
    SelecionarEmpresaStackParamList,
    'selecionar-empresa'
  >;
  route?: RouteProp<SelecionarEmpresaStackParamList, 'selecionar-empresa'>;
}
