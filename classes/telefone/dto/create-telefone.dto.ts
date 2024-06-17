export class CreateTelefoneDto {
    id?: number;
    telefone: string;

    constructor(telefone: string, id?: number){
        this.id = id;
        this.telefone = telefone;
    }
}