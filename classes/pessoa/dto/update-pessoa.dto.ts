import { CreatePessoaDto } from "./create-pessoa.dto";

export class UpdatePessoaDto extends CreatePessoaDto {
    constructor(id: number, nome: string) {
        super(nome, id);
    }
}