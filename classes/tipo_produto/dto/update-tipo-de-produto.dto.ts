import { CreateTipoProdutoDto } from './create-tipo-de-produto.dto';

export class UpdateTipoDeProdutoDto extends CreateTipoProdutoDto {
  constructor(id: number, descricao: string, nome: string) {
    super(nome, descricao, id);
  }
}
