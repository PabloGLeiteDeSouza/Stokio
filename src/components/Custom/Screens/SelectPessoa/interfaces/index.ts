import { PessoasStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISlectPessoaProps {
  navigation?: StackNavigationProp<PessoasStackParamList, 'selecionar-pessoa'>;
  route?: RouteProp<PessoasStackParamList, 'selecionar-pessoa'>;
}
