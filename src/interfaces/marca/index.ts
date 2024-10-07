import {
  CadastrarMarcaScreenNavigationProp,
  CadastrarMarcaScreenRouterProp,
  AtualizarMarcaScreenNavigationProp,
  AtualizarMarcaScreenRouterProp,
  VisualisarMarcaScreenNavigationProp,
  VisualisarMarcaScreenRouterProp,
} from '@/types/screens/marca';

export interface CadastrarMarcaScreen {
  navigation?: CadastrarMarcaScreenNavigationProp;
  route?: CadastrarMarcaScreenRouterProp;
}

export interface AtualizarMarcaScreen {
  navigation?: AtualizarMarcaScreenNavigationProp;
  route?: AtualizarMarcaScreenRouterProp;
}

export interface VisualizarMarcaScreen {
  navigation?: VisualisarMarcaScreenNavigationProp;
  route?: VisualisarMarcaScreenRouterProp;
}
