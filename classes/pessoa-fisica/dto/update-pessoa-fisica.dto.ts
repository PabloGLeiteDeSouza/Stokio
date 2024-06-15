import { CreatePessoaFisicaDto } from "./create-pessoa-fisica.dto";

export class UpdatePessoaFisicaDto extends CreatePessoaFisicaDto {

    constructor(id: number, cpf: string, data_de_nascimento: Date, id_pessoa: number){
        super(cpf, data_de_nascimento, id_pessoa, id);
    }
}