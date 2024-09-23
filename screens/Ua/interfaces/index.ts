import {
  ListarRamosScreenNavigationProp,
  ListarRamosScreenRouteProp,
  AtualizarRamossScreenNavigationProp,
  AtualizarRamosScreenRouteProp,
  CadastrarRamossScreenNavigationProp,
  CadastrarRamosScreenRouteProp,
} from '../types';

export interface ListarRamosScreenProps {
  navigation?: ListarRamosScreenNavigationProp;
  route?: ListarRamosScreenRouteProp;
}

export interface CadastrarRamosScreenProps {
  navigation?: CadastrarRamossScreenNavigationProp;
  route?: CadastrarRamosScreenRouteProp;
}

export interface AtualizarRamosScreenProps {
  navigation?: AtualizarRamossScreenNavigationProp;
  route?: AtualizarRamosScreenRouteProp;
}
