import {
  CadastrarProdutoScreenNavigationProp,
  CadastrarProdutoScreenRouterProp,
  AtualizarProdutoScreenNavigationProp,
  AtualizarProdutoScreenRouterProp,
  VisualisarProdutoScreenNavigationProp,
  VisualisarProdutoScreenRouterProp,
} from '@/types/screens/produto';

export interface CadastrarProdutoScreen {
  navigation?: CadastrarProdutoScreenNavigationProp;
  route?: CadastrarProdutoScreenRouterProp;
}

export interface AtualizarProdutoScreen {
  navigation?: AtualizarProdutoScreenNavigationProp;
  route?: AtualizarProdutoScreenRouterProp;
}

export interface VisualizarProdutoScreen {
  navigation?: VisualisarProdutoScreenNavigationProp;
  route?: VisualisarProdutoScreenRouterProp;
}
