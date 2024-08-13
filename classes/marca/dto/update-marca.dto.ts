import { CreateMarcaDto } from './create-marca.dto';

export class UpdateMarcaDto extends CreateMarcaDto {
  constructor(id: number, nome: string, descricao?: string) {
    super(nome, descricao, id);
  }
}
