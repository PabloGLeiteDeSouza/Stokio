export class CreatePessoaFisicaDto {
    
    id?: number;
    nome_completo: string;
    cpf: string;
    data_de_nascimento: Date;
    id_pessoa: number;
    id_endereco: number;
    
    constructor(nome_completo: string, cpf: string, data_de_nascimento: Date, id_pessoa: number, id_endereco: number, id?: number) {
        this.id = id;
        this.nome_completo = nome_completo;
        this.cpf = cpf;
        this.data_de_nascimento = data_de_nascimento;
        this.id_pessoa = id_pessoa;
        this.id_endereco = id_endereco;
    }
}