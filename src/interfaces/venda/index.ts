import {
  CadastrarVendaScreenNavigationProp,
  CadastrarVendaScreenRouterProp,
  AtualizarVendaScreenNavigationProp,
  AtualizarVendaScreenRouterProp,
  VisualisarVendaScreenNavigationProp,
  VisualisarVendaScreenRouterProp,
  DetalhesVendaScreenNavigationProp,
  DetalhesVendaScreenRouterProp,
} from '@/types/screens/venda';

export interface CadastrarVendaScreen {
  navigation?: CadastrarVendaScreenNavigationProp;
  route?: CadastrarVendaScreenRouterProp;
}

export interface AtualizarVendaScreen {
  navigation?: AtualizarVendaScreenNavigationProp;
  route?: AtualizarVendaScreenRouterProp;
}

export interface VisualizarVendaScreen {
  navigation?: VisualisarVendaScreenNavigationProp;
  route?: VisualisarVendaScreenRouterProp;
}

export interface DetalhesVendaScreen {
  navigation?: DetalhesVendaScreenNavigationProp;
  route?: DetalhesVendaScreenRouterProp;
}
