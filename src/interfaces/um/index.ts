import {
  CadastrarUmScreenNavigationProp,
  CadastrarUmScreenRouterProp,
  AtualizarUmScreenNavigationProp,
  AtualizarUmScreenRouterProp,
  VisualisarUmScreenNavigationProp,
  VisualisarUmScreenRouterProp,
} from '@/types/screens/um';

export interface CadastrarUmScreen {
  navigation?: CadastrarUmScreenNavigationProp;
  route?: CadastrarUmScreenRouterProp;
}

export interface AtualizarUmScreen {
  navigation?: AtualizarUmScreenNavigationProp;
  route?: AtualizarUmScreenRouterProp;
}

export interface VisualizarUmScreen {
  navigation?: VisualisarUmScreenNavigationProp;
  route?: VisualisarUmScreenRouterProp;
}
