import { CreatePessoaDto } from './create-pessoa.dto';

export class UpdatePessoaDto extends CreatePessoaDto {
  id: number;

  constructor(id: number, nome: string, data_de_nascimento: Date, cpf: string) {
    super(nome, data_de_nascimento, cpf);
    this.id = id;
  }
}
