import { CreateEmpresaClienteDto } from './create-empresa-cliente.dto';

export class UpdateEmpresaClienteDto extends CreateEmpresaClienteDto {
  id: number;
  constructor(id: number, id_empresa: number, id_cliente: number) {
    super(id_empresa, id_cliente);
    this.id = id;
  }
}
