import { CreateTelefoneDto } from './create-telefone.dto';

export class UpdateTelefoneDto extends CreateTelefoneDto {
  id: number;

  constructor(id: number, telefone: string, id_pessoa: number) {
    super(telefone, id_pessoa);
    this.id = id;
  }
}
