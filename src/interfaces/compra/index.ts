import {
  CadastrarCompraScreenNavigationProp,
  CadastrarCompraScreenRouterProp,
  AtualizarCompraScreenNavigationProp,
  AtualizarCompraScreenRouterProp,
  VisualisarCompraScreenNavigationProp,
  VisualisarCompraScreenRouterProp,
  DetalhesCompraScreenNavigationProp,
  DetalhesCompraScreenRouterProp,
} from '@/types/screens/compra';

export interface CadastrarCompraScreen {
  navigation?: CadastrarCompraScreenNavigationProp;
  route?: CadastrarCompraScreenRouterProp;
}

export interface AtualizarCompraScreen {
  navigation?: AtualizarCompraScreenNavigationProp;
  route?: AtualizarCompraScreenRouterProp;
}

export interface VisualizarCompraScreen {
  navigation?: VisualisarCompraScreenNavigationProp;
  route?: VisualisarCompraScreenRouterProp;
}

export interface DetalhesCompraScreen {
  navigation?: DetalhesCompraScreenNavigationProp;
  route?: DetalhesCompraScreenRouterProp;
}
