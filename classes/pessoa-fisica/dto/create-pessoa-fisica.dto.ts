export class CreatePessoaFisicaDto {
    
    id?: number;
    cpf: string;
    data_de_nascimento: Date;
    id_pessoa: number;
    
    constructor(cpf: string, data_de_nascimento: Date, id_pessoa: number, id?: number) {
        this.cpf = cpf;
        this.data_de_nascimento = data_de_nascimento;
        this.id_pessoa = id_pessoa;
        this.id = id;
    }
}