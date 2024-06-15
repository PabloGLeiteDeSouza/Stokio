import { CreatePessoaJuridicaDto } from "./create-pessoa-juridica.dto";

export class UpdatePessoaJuridica extends CreatePessoaJuridicaDto {
    constructor(id: number, cnpj: string, razao_socail: string, id_endereco: number) {
        super(cnpj, razao_socail, id_endereco, id);
    }
}