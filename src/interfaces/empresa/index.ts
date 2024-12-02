import {
  CadastrarEmpresaScreenNavigationProp,
  CadastrarEmpresaScreenRouterProp,
  AtualizarEmpresaScreenNavigationProp,
  AtualizarEmpresaScreenRouterProp,
  VisualisarEmpresaScreenNavigationProp,
  VisualisarEmpresaScreenRouterProp,
  DetalhesEmpresaScreenNavigationProp,
  DetalhesEmpresaScreenRouterProp,
} from '@/types/screens/empresa';

export interface CadastrarEmpresaScreen {
  navigation?: CadastrarEmpresaScreenNavigationProp;
  route?: CadastrarEmpresaScreenRouterProp;
}

export interface AtualizarEmpresaScreen {
  navigation?: AtualizarEmpresaScreenNavigationProp;
  route?: AtualizarEmpresaScreenRouterProp;
}

export interface VisualizarEmpresaScreen {
  navigation?: VisualisarEmpresaScreenNavigationProp;
  route?: VisualisarEmpresaScreenRouterProp;
}

export interface DetalhesEmpresaScreen {
  navigation?: DetalhesEmpresaScreenNavigationProp;
  route?: DetalhesEmpresaScreenRouterProp;
}
