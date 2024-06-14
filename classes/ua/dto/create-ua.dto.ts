export class CreateUaDto {
    
    nome: string;
    descricao: string;
    tipo: string;

    constructor(nome: string, descricao: string, tipo:string){
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
    }
}