import { SelecionarClienteStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISlectClienteProps {
  navigation?: StackNavigationProp<
    SelecionarClienteStackParamList,
    'selecionar-cliente'
  >;
  route?: RouteProp<SelecionarClienteStackParamList, 'selecionar-cliente'>;
}
