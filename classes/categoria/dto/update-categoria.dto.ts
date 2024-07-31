import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends CreateCategoriaDto {
  constructor(id: number, nome: string) {
    super(nome, id);
  }
}
