import {
  ListarClientesScreenNavigationProp,
  ListarClientesScreenRouteProp,
  AtualizarClientesScreenNavigationProp,
  AtualizarClientesScreenRouteProp,
  CadastrarClientesScreenNavigationProp,
  CadastrarClientesScreenRouteProp,
} from '../types';

export interface ListarClientesScreenProps {
  navigation?: ListarClientesScreenNavigationProp;
  route?: ListarClientesScreenRouteProp;
}

export interface CadastrarClientesScreenProps {
  navigation?: CadastrarClientesScreenNavigationProp;
  route?: CadastrarClientesScreenRouteProp;
}

export interface AtualizarClientesScreenProps {
  navigation?: AtualizarClientesScreenNavigationProp;
  route?: AtualizarClientesScreenRouteProp;
}
