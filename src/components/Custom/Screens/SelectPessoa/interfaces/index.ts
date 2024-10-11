import { PessoasStackParamList } from '@/types';
import { Pessoa } from '@/types/screens/cliente';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISlectPessoaProps {
  navigation?: StackNavigationProp<PessoasStackParamList, 'selecionar-pessoa'>;
  route?: RouteProp<PessoasStackParamList, 'selecionar-pessoa'>;
  pessoas: Array<Pessoa>;
}
