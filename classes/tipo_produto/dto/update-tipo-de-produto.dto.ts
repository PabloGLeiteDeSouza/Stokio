import { CreateTipoProdutoDto } from './create-tipo-de-produto.dto';

export class UpdateTipoDeProdutoDto extends CreateTipoProdutoDto {
  constructor(id: number, nome: string) {
    super(nome, id);
  }
}
