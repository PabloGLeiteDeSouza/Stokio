import { CreateItemVendaDto } from './create-item-venda.dto';

export class UpdateItemVendaDto extends CreateItemVendaDto {
  constructor(id: number, nome: string, descricao: string) {
    super(nome, descricao, id);
  }
}
