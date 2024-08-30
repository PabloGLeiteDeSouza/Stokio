import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends CreateCategoriaDto {
  constructor(id: number, nome: string, descricao: string) {
    super(nome, descricao, id);
  }
}
