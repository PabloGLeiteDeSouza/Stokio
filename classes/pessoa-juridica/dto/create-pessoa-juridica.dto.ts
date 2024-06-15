export class CreatePessoaJuridicaDto {
    
    id?: number;
    cnpj: string;
    razao_social: string;
    id_endereco: number;
    
    constructor(cnpj: string, razao_socail: string, id_endereco: number, id?: number,){
        this.id = id;
        this.cnpj = cnpj;
        this.razao_social = razao_socail;
        this.id_endereco = id_endereco;
    }
}