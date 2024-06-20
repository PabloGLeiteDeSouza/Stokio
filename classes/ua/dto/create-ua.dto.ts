export class CreateUnidadeDeArmazenamentoDto {
    
    id?: number;
    nome: string;
    descricao: string;
    id_tipo_unidade_de_armazenamento: number;

    constructor(nome: string, descricao: string, id_tipo_unidade_de_armazenamento: number, id?: number){
        this.nome = nome;
        this.descricao = descricao;
        this.id_tipo_unidade_de_armazenamento = id_tipo_unidade_de_armazenamento;
        this.id = id;
    }
}