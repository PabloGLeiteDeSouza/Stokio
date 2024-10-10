import { RootStackParamList } from "@/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface ISlectClienteProps {
    navigation?: StackNavigationProp<
    RootStackParamList,
    'selecionar-cliente'
  >;
  route?: RouteProp<
  RootStackParamList,
  'selecionar-cliente'
>;
}