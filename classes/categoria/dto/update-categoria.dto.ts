import { CreateCategotiaDto } from './create-categoria.dto';

export class UpdateCategoroaDto extends CreateCategotiaDto {
  constructor(id: number, nome: string) {
    super(nome, id);
  }
}
