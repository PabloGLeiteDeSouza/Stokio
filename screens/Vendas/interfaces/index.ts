import {
  AtualizarVendasScreenNavigationProp,
  AtualizarVendasScreenRouteProp,
  CadastrarVendasScreenRouteProp,
  CadastrarVendasScreenNavigationProp,
  ListarVendasScreenNavigationProp,
  ListarVendasScreenRouteProp,
} from '../types';

export interface ListarVendasScreenProps {
  navigation?: ListarVendasScreenNavigationProp;
  route?: ListarVendasScreenRouteProp;
}

export interface CadastrarVendasScreenProps {
  navigation?: CadastrarVendasScreenNavigationProp;
  route?: CadastrarVendasScreenRouteProp;
}

export interface AtualizarVendasScreenProps {
  navigation?: AtualizarVendasScreenNavigationProp;
  route?: AtualizarVendasScreenRouteProp;
}
