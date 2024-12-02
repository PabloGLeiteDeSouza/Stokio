import {
  CadastrarTipoUaScreenNavigationProp,
  CadastrarTipoUaScreenRouterProp,
  AtualizarTipoUaScreenNavigationProp,
  AtualizarTipoUaScreenRouterProp,
  VisualisarTipoUaScreenNavigationProp,
  VisualisarTipoUaScreenRouterProp,
} from '@/types/screens/tipo-ua';

export interface CadastrarTipoUaScreen {
  navigation?: CadastrarTipoUaScreenNavigationProp;
  route?: CadastrarTipoUaScreenRouterProp;
}

export interface AtualizarTipoUaScreen {
  navigation?: AtualizarTipoUaScreenNavigationProp;
  route?: AtualizarTipoUaScreenRouterProp;
}

export interface VisualizarTipoUaScreen {
  navigation?: VisualisarTipoUaScreenNavigationProp;
  route?: VisualisarTipoUaScreenRouterProp;
}
