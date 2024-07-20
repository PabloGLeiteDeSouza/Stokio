import { CreateEmpresaDto } from './create-empresa.dto';

export class UpdateEmpresaDto extends CreateEmpresaDto {
  constructor(
    id: number,
    ramo: string,
    id_endereco: number,
    nome_completo?: string,
    data_de_nascimento?: Date | string,
    cpf?: string,
    nome_fantasia?: string,
    razao_social?: string,
    cnpj?: string,
  ) {
    super(
      ramo,
      id_endereco,
      nome_completo,
      data_de_nascimento,
      cpf,
      nome_fantasia,
      razao_social,
      cnpj,
      id,
    );
  }
}
