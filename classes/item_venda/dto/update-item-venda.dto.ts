import { CreateItemVendaDto } from './create-item-venda.dto';

export class UpdateItemVendaDto extends CreateItemVendaDto {
  id: number;

  constructor(
    id: number,
    quantidade: number,
    valor: number,
    id_produto: number,
    id_venda: number,
  ) {
    super(quantidade, valor, id_produto, id_venda);
    this.id = id;
  }
}
