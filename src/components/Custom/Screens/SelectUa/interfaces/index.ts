import { SelecionarUaStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectUaProps {
  navigation?: StackNavigationProp<SelecionarUaStackParamList, 'selecionar-ua'>;
  route?: RouteProp<SelecionarUaStackParamList, 'selecionar-ua'>;
}
