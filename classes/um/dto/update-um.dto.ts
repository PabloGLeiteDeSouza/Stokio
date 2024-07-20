import { CreateUmDto } from './create-um.dto';

export class UpdateUmDto extends CreateUmDto {
  constructor(id: number, nome: string) {
    super(nome, id);
  }
}
