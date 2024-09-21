import { CreateUmDto } from './create-um.dto';

export class UpdateUmDto extends CreateUmDto {
  id: number;

  constructor(id: number, nome: string, valor: string, descricao: string) {
    super(nome, valor, descricao);
    this.id = id;
  }
}
