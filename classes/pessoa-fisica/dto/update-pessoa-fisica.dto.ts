import { CreatePessoaFisicaDto } from "./create-pessoa-fisica.dto";

export class UpdatePessoaFisicaDto extends CreatePessoaFisicaDto {

    constructor(id: number, nome_completo: string, cpf: string, data_de_nascimento: Date, id_pessoa: number){
        super(nome_completo, cpf, data_de_nascimento, id_pessoa, id);
    }
}