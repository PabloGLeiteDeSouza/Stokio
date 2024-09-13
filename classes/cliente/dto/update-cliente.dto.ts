import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends CreateClienteDto {
  constructor(id: number, id_pessoa: number, limite: number, status: boolean) {
    super(id_pessoa, limite, status, id);
  }
}
