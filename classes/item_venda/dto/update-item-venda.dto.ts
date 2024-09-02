import { CreateItemVendaDto } from './create-item-venda.dto';

export class UpdateItemVendaDto extends CreateItemVendaDto {
  constructor(
    id: number,
    quantidade: number,
    id_produto: number,
    id_venda: number,
  ) {
    super(quantidade, id_produto, id_venda, id);
  }
}
