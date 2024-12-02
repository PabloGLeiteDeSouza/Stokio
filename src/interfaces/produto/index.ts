import {
  CadastrarProdutoScreenNavigationProp,
  CadastrarProdutoScreenRouterProp,
  AtualizarProdutoScreenNavigationProp,
  AtualizarProdutoScreenRouterProp,
  VisualisarProdutoScreenNavigationProp,
  VisualisarProdutoScreenRouterProp,
  DetalhesProdutoScreenNavigationProp,
  DetalhesProdutoScreenRouterProp,
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
export interface DetalhesProdutoScreen {
  navigation?: DetalhesProdutoScreenNavigationProp;
  route?: DetalhesProdutoScreenRouterProp;
}
