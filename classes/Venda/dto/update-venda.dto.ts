import { CreateVendaDto } from './create-venda.dto';

export class UpdateVendaDto extends CreateVendaDto {
  id: number;

  constructor(id: number, valor: number, data: Date, id_cliente: number) {
    super(valor, data, id_cliente);
    this.id = id;
  }
}
