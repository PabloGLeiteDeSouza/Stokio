export class CreateUaDto {
    
    id?: number;
    nome: string;
    descricao: string;
    tipo: string;

    constructor(nome: string, descricao: string, tipo:string, id?: number){
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
        this.id = id;
    }
}