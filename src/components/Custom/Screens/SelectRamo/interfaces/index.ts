import { SelecionarRamoStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ISelectRamoProps {
  navigation?: StackNavigationProp<
    SelecionarRamoStackParamList,
    'selecionar-ramo'
  >;
  route?: RouteProp<SelecionarRamoStackParamList, 'selecionar-ramo'>;
}
