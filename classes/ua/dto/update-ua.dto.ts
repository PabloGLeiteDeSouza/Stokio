import { CreateUaDto } from "./create-ua.dto";

export class UpdateUaDto extends CreateUaDto {
    
    id: number;

    constructor(id: number, nome: string, descricao: string, tipo: string){
        super(nome, descricao, tipo);
        this.id = id;
    }
}