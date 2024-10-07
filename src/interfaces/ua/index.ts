import {
  AtualizarUaScreenNavigationProp,
  AtualizarUaScreenRouterProp,
  CadastrarUaScreenNavigationProp,
  CadastrarUaScreenRouterProp,
  VisualisarUaScreenNavigationProp,
  VisualisarUaScreenRouterProp,
  DetalhesUaScreenNavigationProp,
  DetalhesUaScreenRouterProp,
} from '@/types/screens/ua';

export interface CadastrarUaScreen {
  navigation?: CadastrarUaScreenNavigationProp;
  route?: CadastrarUaScreenRouterProp;
}

export interface AtualizarUaScreen {
  navigation?: AtualizarUaScreenNavigationProp;
  route?: AtualizarUaScreenRouterProp;
}

export interface VisualizarUaScreen {
  navigation?: VisualisarUaScreenNavigationProp;
  route?: VisualisarUaScreenRouterProp;
}

export interface DetalhesUaScreen {
  navigation?: DetalhesUaScreenNavigationProp;
  route?: DetalhesUaScreenRouterProp;
}
