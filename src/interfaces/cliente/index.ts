import {
  CadastrarClienteScreenNavigationProp,
  CadastrarClienteScreenRouterProp,
  AtualizarClienteScreenNavigationProp,
  AtualizarClienteScreenRouterProp,
  VisualisarClienteScreenNavigationProp,
  VisualisarClienteScreenRouterProp,
  DetalhesClienteScreenNavigationProp,
  DetalhesClienteScreenRouterProp,
} from '@/types/screens/cliente';

export interface CadastrarClienteScreen {
  navigation?: CadastrarClienteScreenNavigationProp;
  route?: CadastrarClienteScreenRouterProp;
}

export interface AtualizarClienteScreen {
  navigation?: AtualizarClienteScreenNavigationProp;
  route?: AtualizarClienteScreenRouterProp;
}

export interface VisualizarClienteScreen {
  navigation?: VisualisarClienteScreenNavigationProp;
  route?: VisualisarClienteScreenRouterProp;
}

export interface DetalhesClienteScreen {
  navigation?: DetalhesClienteScreenNavigationProp;
  route?: DetalhesClienteScreenRouterProp;
}
