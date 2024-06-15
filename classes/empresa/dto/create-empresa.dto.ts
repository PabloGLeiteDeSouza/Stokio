export class CreateEmpresaDto {
    
    id?: number;
    ramo: string;
    id_pessoa: number;

    constructor(ramo: string, id_pessoa: number, id?: number) {
        this.id = id;
        this.ramo = ramo;
        this.id_pessoa = id_pessoa;
    }
}