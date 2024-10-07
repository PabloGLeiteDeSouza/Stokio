import {
  CadastrarTipoProdutoScreenNavigationProp,
  CadastrarTipoProdutoScreenRouterProp,
  AtualizarTipoProdutoScreenNavigationProp,
  AtualizarTipoProdutoScreenRouterProp,
  VisualisarTipoProdutoScreenNavigationProp,
  VisualisarTipoProdutoScreenRouterProp,
} from '@/types/screens/tipo-produto';

export interface CadastrarTipoProdutoScreen {
  navigation?: CadastrarTipoProdutoScreenNavigationProp;
  route?: CadastrarTipoProdutoScreenRouterProp;
}

export interface AtualizarTipoProdutoScreen {
  navigation?: AtualizarTipoProdutoScreenNavigationProp;
  route?: AtualizarTipoProdutoScreenRouterProp;
}

export interface VisualizarTipoProdutoScreen {
  navigation?: VisualisarTipoProdutoScreenNavigationProp;
  route?: VisualisarTipoProdutoScreenRouterProp;
}
