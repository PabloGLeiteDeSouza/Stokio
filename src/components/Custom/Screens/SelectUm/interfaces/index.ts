import { SelecionarUmStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectUmProps {
  navigation?: StackNavigationProp<SelecionarUmStackParamList, 'selecionar-um'>;
  route?: RouteProp<SelecionarUmStackParamList, 'selecionar-um'>;
}
