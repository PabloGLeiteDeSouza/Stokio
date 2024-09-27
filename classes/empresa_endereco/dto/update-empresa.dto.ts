import { CreateEmpresaDto } from './create-empresa.dto';

export class UpdateEmpresaDto extends CreateEmpresaDto {
  id: number;
  constructor(
    id: number,
    id_ramo: number,
    id_pessoa: number,
    nome_fantasia?: string,
    razao_social?: string,
    cnpj?: string,
  ) {
    super(id_ramo, id_pessoa, nome_fantasia, razao_social, cnpj);
    this.id = id;
  }
}
