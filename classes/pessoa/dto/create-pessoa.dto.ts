export class CreatePessoaDto {

    id?: number;
    nome: string;

    constructor(nome: string, id?: number) {
        this.id = id;
        this.nome = nome;
    }
}