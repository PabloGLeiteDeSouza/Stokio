import { SelecionarTipoUaStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectTipoUaProps {
  navigation?: StackNavigationProp<SelecionarTipoUaStackParamList, 'selecionar-tipo-ua'>;
  route?: RouteProp<SelecionarTipoUaStackParamList, 'selecionar-tipo-ua'>;
}
